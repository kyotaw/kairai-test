'use strict';

const AccessToken = require('../models/access_token').AccessToken
    , userRepository = require('../models/user_repository')
    , errors = require('../errors')
    , hashEnv = require('../env').auth.hash
    , hash = require('../helpers/hash');

const authService = {

    async login(userId, password) {
        const user = await userRepository.getByUserId(userId);
        if (!user) {
            throw new errors.KairaiError(errors.ErrorTypes.USER_NOT_EXIST);
        }
        const hashedPass = await hash.pbkdf2(
            password,
            user.salt,
            hashEnv[user.hashVersion].ITERATION,
            hashEnv[user.hashVersion].HASH_LENGTH,
            hashEnv[user.hashVersion].ALGO);
        if (user.password !== hashedPass) {
            throw new errors.KairaiError(errors.ErrorTypes.PASSWORD_DONOT_MATCH);
        }
        return this.generateAccessToken(user);
    },
    
    generateAccessToken(user) {
        return new AccessToken(user);
    }
}

module.exports = authService;
