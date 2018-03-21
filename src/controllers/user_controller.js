'use strict';

const userService = require('../services/user_service')
    , userResponse = require('./user_response')
    , shortcut = require('./response_shortcuts')
    , errors = require('../errors');

const userController = {

    create(req, res) {
        userService.createProprietaryUser(req.body).then(user => {
            shortcut.successResponse(res, userResponse.userResponse(user));
        }).catch (err => {
            if (err.errorType === errors.ErrorTypes.USER_ALREADY_EXISTS ||
                err.errorType === errors.ErrorTypes.INVALID_PARAMETERS) {
                res.status(400);
                shortcut.errorResponse(res, err);
            } else {
                shortcut.error500Response(res, err);
            }
        });
    },

    updatePassword(req, res) {
        userService.updatePassword(req.user, req.body.currentPassword, req.body.newPassword).then(user => {
            shortcut.successResponse(res, userResponse.userResponse(user));
        }).catch (err => {
            if (err.errorType === errors.ErrorTypes.PASSWORD_DONOT_MATCH) {
                res.status(400);
                shortcut.errorResponse(res, err);
            } else {
                shortcut.error500Response(res, err);
            }
        });
    }
}

module.exports = userController;
