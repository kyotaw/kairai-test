'use strict';

const AccessToken = require('../models/access_token').AccessToken
    , userRepository = require('../models/user_repository')
    , errors = require('../errors')
    , hashEnv = require('../env').auth.hash
    , cryptEnv = require('../env').auth.crypt
    , hash = require('../helpers/hash')
    , encrypt = require('../helpers/crypt').encrypt
    , jwtOptions = require('../middlewares/auth_filter').jwtOptions
    , jwt = require('passport-jwt');

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
        return {user: user, accessToken: this.generateAccessToken(user)};
    },

    async isLoggedIn(accessToken) {
        return new Promise((resolve, reject) => {
            jwt.Strategy.JwtVerifier(
                accessToken,
                jwtOptions.secretOrKey,
                jwtOptions,
                (err, payload) => {
                    if (err) {
                        resolve(false);
                    } else {
                        userRepository.getByUserId(payload.sub).then(user => {
                            const isLoggedIn = user ? true : false;
                            resolve(isLoggedIn);
                        },
                        reject);
                    }
                });
        });
    },
    
    generateAccessToken(user) {
        return new AccessToken(user);
    }
}

module.exports = authService;
