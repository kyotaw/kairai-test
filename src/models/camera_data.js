'use strict';

const Data = require('./data').Data
    , array = require('../helpers/array');

class CameraData extends Data {
    
    constructor(params) {
        if (array.isArray(params)) {
            params = {
                width: params[0],
                height: params[1],
                data: params[2],
                format: params[3],
                timestamp: params[4]
            }
        }
        super(params);
        this.width = params.width || null;
        this.height = params.height || null;
        this.data = params.data || null;
        this.format = params.format || null;
    }

    toArray() {
        return [this.width, this.height, this.data, this.format, this.timestamp];
    }
}

module.exports.CameraData = CameraData;
