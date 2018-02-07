'use strict';

const Data = require('./data').Data
    , array = require('../helpers/array');

class AccelerometerData extends Data {
    
    constructor(params) {
        if (array.isArray(params)) {
            params = {
                x: params[0],
                y: params[1],
                z: params[2],
                timestamp: params[3]
            }
        }
        super(params);
        this.x = params.x || 0.0;
        this.y = params.y || 0.0;
        this.z = params.z || 0.0;
    }

    get plainData() {
        return [this.x, this.y, this.z, this.timestamp];
    }
}
