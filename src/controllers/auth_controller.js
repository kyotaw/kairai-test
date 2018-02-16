'use strict';

const authService = require('../services/auth_service')
    , shortcut = require('./response_shortcuts')
    , errors = require('../errors');

const authController = {

    login(req, res) {
        authService.login(req.query.userId, req.query.password).then(accessToken => {
            shortcut.successResponse(res, accessToken);
        }).catch (err => {
            if (err.errorType === errors.ErrorTypes.AUTH_PASSWORD_DONOT_MATCH) {
                res.status(400);
                shortcut.errorResponse(res, err);
            } else {
                shortcut.error500Response(res, err);
            }
        });
    }
}

module.exports = authController;
