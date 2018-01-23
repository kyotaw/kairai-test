'use strict';

const array = require('../helpers/array')
    , errors = require('../errors');

function successResponse(res, data=null, dataName='data') {
    if (data) {
        let body = {status: 'success'};
        body[dataName] = data
        res.json(body);
    } else {
        res.json({status: 'success'});
    }
}

function errorResponse(res, err) {
    if (err) {
        res.json({status: 'error', message: err.message, errorCode: err.errorType});
    } else {
        errorResponse(res, errors.internalError());
    }
}

function error500Response(res, err) {
    res.status(500).json({status: 'error', message: err.message});
}

function jsonResponseOr500Error(res, err, data) {
    if (err) {
        error500Response(res, err);
    } else {
        successResponse(res, data);
    }
}


module.exports = {
    successResponse: successResponse,
    errorResponse: errorResponse,
    error500Response: error500Response,
    jsonResponseOr500Error: jsonResponseOr500Error,
}
