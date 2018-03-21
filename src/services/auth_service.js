'use strict';

const AccessToken = require('../models/access_token').AccessToken
    , userRepository = require('../models/user_repository')
    , errors = require('../errors')
    , hashEnv = require('../env').auth.hash
    , cryptEnv = require('../env').auth.crypt
    , hash = require('../helpers/hash')
    , encrypt = require('../helpers/crypt').encrypt;

const authService = {

    async login(email, password) {
        const encryptedEmail = encrypt(email, cryptEnv.AUTH_CRYPT_KEY, cryptEnv.AUTH_CRYPT_ALGO);
        const user = await userRepository.getByEmail(encryptedEmail);
        if (!user) {
            throw new errors.KairaiError(errors.ErrorTypes.USER_NOT_FOUND);
        }

        const passMatch = await user.comparePassword(password);
        if (!passMatch) {
            throw new errors.KairaiError(errors.ErrorTypes.PASSWORD_DONOT_MATCH);
        }
        return this.generateAccessToken(user);
    },
    
    generateAccessToken(user) {
        return new AccessToken(user);
    }
}

module.exports = authService;
