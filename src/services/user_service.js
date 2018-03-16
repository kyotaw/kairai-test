'use strict';

const userRepository = require('../models/user_repository')
    , errors = require('../errors')
    , hashEnv = require('../env').auth.hash
    , cryptEnv = require('../env').auth.crypt
    , hash = require('../helpers/hash')
    , { encrypt, decrypt } = require('../helpers/crypt');

const userService = {

    async createProprietaryUser(params) {
        const user = await userRepository.getByUserId(params.userId);
        if (user) {
            throw new errors.KairaiError(errors.ErrorTypes.USER_ALREADY_EXISTS);
        }

        const latestHashEnv = hashEnv.latestVersion;
        const salt = hash.randomBytes(latestHashEnv.SALT_LENGTH);
        params.email = encrypt(params.email, cryptEnv.AUTH_CRYPT_KEY, cryptEnv.AUTH_CRYPT_ALGO);
        params.password = await hash.pbkdf2(
            params.password,
            salt,
            latestHashEnv.ITERATION,
            latestHashEnv.HASH_LENGTH,
            latestHashEnv.ALGO);
        params.salt = salt;
        params.loginSystem = 'kairai';
        params.hashVersion = latestHashEnv.VERSION;
        return await userRepository.create(params);
    },

    async createSocialUser(params) {
        const user = await userRepository.getBySocialId(params.socialUserId, params.loginSystem);
        if (user) {
            throw new errors.KairaiError(errors.ErrorTypes.USER_ALREADY_EXISTS);
        }
        params.userId = hash.randomBytes(64);
        return await userRepository.create(params);
    },

    async getById(id) {
        let user = await userRepository.getById(id);
        return this._decrypt_email(user);
    },
    
    async getByUserId(userId) {
        let user = await userRepository.getUserById(userId);
        return this._decrypt_email(user);
    },

    async getBySocialId(socialUserId, loginSystem) {
        let user = await userRepository.getBySocialId(socialUserId, loginSystem);
        return this._decrypt_email(user);
    },

    _decrypt_email(user) {
        if (user.email) {
            user.email = decrypt(user.email, cryptEnv.AUTH_CRYPT_KEY, cryptEnv.AUTH_CRYPT_ALGO);
        }
        return user;
    }
}

module.exports = userService;
