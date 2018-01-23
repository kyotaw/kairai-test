'use strict';

const errors = require('../errors')
    , shortcut = require('../controllers/response_shortcuts');

function validate_create(req, res, next) {
    if (req.body.modelNumber &&
        req.body.serialNumber &&
        req.body.vendorName) {
        next();    
    } else {
        res.status(400);
        shortcut.errorResponse(res, new errors.KairaiError(errors.ErrorTypes.MISSING_PARAMETERS));
    }
}

function validate_get(req, res, next) {
    if (req.query.hash) {
        next();
    } else if (req.query.modelNumber &&
               req.query.serialNumber &&
               req.query.vendorName) {
        next();
    } else if (req.query.userId) {
        next();
    } else {
        res.status(400);
        shortcut.errorResponse(res, new errors.KairaiError(errors.ErrorTypes.MISSING_PARAMETERS));
    }
}

module.exports = {
    validate_create: validate_create,
    validate_get: validate_get
}
