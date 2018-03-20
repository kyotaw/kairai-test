'use strict';

const authService = require('../services/auth_service')
    , authResponse = require('./auth_response')
    , shortcut = require('./response_shortcuts')
    , errors = require('../errors')
    , jwtOptions = require('../middlewares/auth_filter').jwtOptions
    , jwt = require('passport-jwt');

const authController = {

    login(req, res) {
        authService.login(req.query.email, req.query.password).then(accessToken => {
            shortcut.successResponse(res, authResponse.loginResponse(req.query.userId, accessToken));
        }).catch (err => {
            if (err.errorType === errors.ErrorTypes.AUTH_PASSWORD_DONOT_MATCH ||
                err.errorType === errors.ErrorTypes.USER_NOT_FOUND) {
                res.status(400);
                shortcut.errorResponse(res, err);
            } else {
                shortcut.error500Response(res, err);
            }
        });
    },

    loggedIn(req, res) {
        jwt.Strategy.JwtVerifier(
            req.query.accessToken,
            jwtOptions.secretOrKey,
            jwtOptions,
            (err, payload) => {
                const isLoggedIn = err ? false : true;
                shortcut.successResponse(res, authResponse.loggedInResponse(isLoggedIn));
            });
    }
}

module.exports = authController;
