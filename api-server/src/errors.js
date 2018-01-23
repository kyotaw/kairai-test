'use strict';

const ErrorTypes = {
    UNKNOWN_INTERNAL_ERROR: 1,
    INVALID_ARG_TYPE: 101,
    MISSING_PARAMETERS: 102,

    MONO_ALREADY_EXISTS: 201,
    MONO_NOT_FOUND: 202,
}

let ErrorMessages = {}
ErrorMessages[ErrorTypes.UNKNOWN_INTERNAL_ERROR] = 'internal error';
ErrorMessages[ErrorTypes.INVALID_ARG_TYPE] = 'invalid arg type';
ErrorMessages[ErrorTypes.MISSING_PARAMETERS] = 'missing parameters';

ErrorMessages[ErrorTypes.MONO_ALREADY_EXISTS] = 'the mono already exists';
ErrorMessages[ErrorTypes.MONO_NOT_FOUND] = 'the mono not found';


class KairaiError extends Error {
    constructor(errorType, message=null) {
        message = message || ErrorMessages[errorType] || '';
        super(message);
        this.errorType = errorType;
    }
}

function internalError() {
    return new KairaiError(ErrorTypes.UNKNOWN_INTERNAL_ERROR, 'internal error');
}

module.exports = {
    ErrorTypes: ErrorTypes,
    KairaiError: KairaiError,
    internalError: internalError
}
