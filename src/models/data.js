'use strict';

const timestamp = require('../helpers/time').timestamp;

class Data {

    constructor(params) {
        timestamp = params.timestamp || timestamp();
    }
}

module.exports.Data = Data;
