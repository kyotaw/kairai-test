'use strict';

const timestamp = require('../helpers/time').timestamp;

class Data {

    constructor(params) {
        this.timestamp = params.timestamp || timestamp();
        this.latitude = params.location || null;
    }
}

module.exports.Data = Data;
