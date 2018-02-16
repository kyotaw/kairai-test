'use strict';

const authService = require('../services/auth_service')
    , shortcut = require('./response_shortcuts')
    , errorTypes = require('../errors').ErrorTypes;
   
const siteController = {

    loggedin(req, res) {
        const token = authService.generateAccessToken(req.user);
        shortcut.successResponse(token);
    }

}
