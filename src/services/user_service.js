'use strict';

const userRepository = require('../models/user_repository')
    , errors = require('../errors')
    , User = require('../models/user').User
    , cryptEnv = require('../env').auth.crypt
    , hash = require('../helpers/hash')
    , encrypt = require('../helpers/crypt').encrypt;

const userService = {

    async createProprietaryUser(params) {
        if (!params.email || !params.password) {
            throw new errors.KairaiError(errors.ErrorTypes.INVALID_PARAMETERS);
        }
        const encryptedEmail = encrypt(params.email, cryptEnv.AUTH_CRYPT_KEY, cryptEnv.AUTH_CRYPT_ALGO);
        const user = await userRepository.getByEmail(encryptedEmail);
        if (user) {
            throw new errors.KairaiError(errors.ErrorTypes.USER_ALREADY_EXISTS);
        }

        params.email = encryptedEmail;
        params.userId = hash.randomBytes(64);
        params.loginSystem = 'kairai';
        const newUser = new User(params);
        await newUser.setPassword(params.password);

        return await userRepository.create(newUser);
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
        return await userRepository.getById(id);
    },
    
    async getByUserId(userId) {
        return  await userRepository.getByUserId(userId);
    },

    async getBySocialId(socialUserId, loginSystem) {
        return await userRepository.getBySocialId(socialUserId, loginSystem);
    },

    async updatePassword(user, curPassword, newPassword) {
        const passMatch = await user.comparePassword(curPassword);
        if (!passMatch) {
            throw new errors.KairaiError(errors.ErrorTypes.PASSWORD_DONOT_MATCH);
        }
        await user.setPassword(newPassword);
        return await userRepository.update(user, ['password', 'salt', 'hashVersion']);
    },

    async delete(userId) {
        await userRepository.delete(userId);    
    },

}

module.exports = userService;
