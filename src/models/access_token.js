'use strict';

const jwt = require('jsonwebtoken')
    , env = require('../env');

class AccessToken {
    
    constructor(user) {
        this.token = jwt.sign({},
            env.accessToken.JWT_SECRET,
            {
                expiresIn: env.accessToken.JWT_EXPIRES_IN,
                audience: env.accessToken.JWT_AUDIENCE,
                issuer: env.accessToken.JWT_ISSURE,
                subject: user.userId || user.socialUserId,
            }
        );
    }
}

module.exports.AccessToken = AccessToken;
