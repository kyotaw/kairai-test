'use strict';

const Data = require('./data').Data
    , array = require('../helpers/array');

class BarometerData extends Data {
    
    constructor(params) {
        if (array.isArray(params)) {
            params = {
                pressure: params[0],
                timestamp: params[1]
            }
        }
        super(params);
        this.pressure = params.pressure || null;
    }

    toArray() {
        return [this.pressure, this.timestamp];
    }
}

module.exports.BarometerData = BarometerData;
