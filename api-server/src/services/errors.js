'use strict';

const ErrorTypes = {
    UNKNOWN_INTERNAL_ERROR: 1,
    INVALID_ARG_TYPE: 101,

    MONO_ALREADY_EXISTS: 201,
    MONO_NOT_FOUND: 202,
}

class KairaiError extends Error {
    constructor(errorType, message='') {
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
