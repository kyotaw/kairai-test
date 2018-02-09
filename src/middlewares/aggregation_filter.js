'use strict';

const error = require('../errors');

function convertQueryParams(socket, next) {
    let query = socket.handshake.query;
    if (query.latitude && query.longitude && query.radius) {
        query.area = {
            latitude: parseFloat(query.latitude),
            longitude: parseFloat(query.longitude),
            radius: parseFloat(query.radius)
        }
        return next();
    } else {
        next(new error.KairaiError(error.ErrorTypes.INVALID_PARAMETERS));
    }
}

module.exports = {
    convertQueryParams: convertQueryParams
}
