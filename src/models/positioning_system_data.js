'use strict';

const Data = require('./data').Data
    , array = require('../helpers/array');

class PositioningSystemData extends Data {
    
    constructor(params) {
        if (array.isArray(params)) {
            params = {
                location: {
                    latitude: params[0],
                    longitude: params[1]
                },
                timestamp: params[2]
            }
        }
        super(params);
        this.location = params.location || null;
    }

    toArray() {
        return [this.location.latitude, this.location.longitude, this.timestamp];
    }
}

module.exports.PositioningSystemData = PositioningSystemData;
