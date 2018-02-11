'use strict';

const DataSource = require('./data_source').DataSource
    , AccelerometerSpec = require('./accelerometer_spec').AccelerometerSpec
    , AccelerometerSpecEntity = require('./entities/accelerometer_spec_entity').AccelerometerSpecEntity
    , AccelerometerData = require('./accelerometer_data').AccelerometerData;

class Accelerometer extends DataSource {

    constructor(params) {
        super(params);
    }

    static get specClass() {
        return AccelerometerSpec;
    }

    get specClass() {
        return Accelerometer.specClass;
    }

    static get specEntity() {
        return AccelerometerSpecEntity;
    }
    
    get specEntity() {
        return Accelerometer.specEntity;
    }

    static get dataClass() {
        return AccelerometerData;
    }
    
    get dataClass() {
        return Accelerometer.dataClass;
    }
}

module.exports.Accelerometer = Accelerometer
