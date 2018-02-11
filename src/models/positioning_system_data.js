'use strict';

const Data = require('./data').Data
    , array = require('../helpers/array');

class PositioningSystemData extends Data {
    
    constructor(params) {
        if (array.isArray(params)) {
            params = {
                latitude: params[0],
                longitude: params[1],
                timestamp: params[2]
            }
        }
        super(params);
        this.latitude = params.latitude || null;
        this.longitude = params.longitude || null;
    }

    toArray() {
        return [this.latitude, this.longitude, this.timestamp];
    }
}

module.exports.PositioningSystemData = PositioningSystemData;
