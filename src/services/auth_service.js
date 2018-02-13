'use strict';

const AccessToken = require('../models/access_token').AccessToken;

const authService = {
    
    generateAccessToken(user) {
        return new AccessToken(user);
    }
}
