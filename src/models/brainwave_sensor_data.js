'use strict';

const Data = require('./data').Data
    , array = require('../helpers/array');

 class MindWaveSensorData extends Data {
 
     constructor(params) {
        if (array.isArray(params)) {
            params = {
                samples: params[0]
            }
        }
        super(params);
        this.samples = params.samples = [];
     }

     toArray() {
        return [this.samples];
     }
 }

module.exports.MindWaveSensorData = MindWaveSensorData;
