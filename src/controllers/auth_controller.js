'use strict';

const authService = require('../services/auth_service')
    , shortcut = require('./response_shortcuts')
    , errorTypes = require('../errors').ErrorTypes;
   
const authController = {

    generateAccessToken(req, res) {
        const token = authService.generateAccessToken(req.user);
        shortcut.successResponse(token);
    }

}
