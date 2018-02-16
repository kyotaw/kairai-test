'use strict';

const userRepository = require('../models/user_repository')
    , errors = require('../errors')
    , hashEnv = require('../env').auth.hash
    , hash = require('../helpers/hash');

const userService = {

    async createProprietaryUser(params) {
        const user = await userRepository.getByUserId(params.userId);
        if (user) {
            throw new errors.KairaiError(errors.ErrorTypes.USER_ALREADY_EXISTS);
        }

        const latestHashEnv = hashEnv[hashEnv.length - 1];
        const salt = hash.randomBytes(latestHashEnv.SALT_LENGTH);
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
        return await userRepository.create(params);
    },

    async getBySocialId(socialUserId, loginSystem) {
        return await userRepository.getBySocialId(socialUserId, loginSystem);
    }

}

module.exports = userService;
