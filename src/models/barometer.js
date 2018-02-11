'use strict';

const DataSource = require('./data_source').DataSource
    , BarometerSpec = require('./barometer_spec').BarometerSpec
    , BarometerSpecEntity = require('./entities/barometer_spec_entity').BarometerSpecEntity
    , BarometerData = require('./barometer_data').BarometerData;

class Barometer extends DataSource {

    constructor(params) {
        super(params);
    }

    static get specClass() {
        return BarometerSpec;
    }
    
    get specClass() {
        return Barometer.specClass;
    }

    static get specEntity() {
        return BarometerSpecEntity;
    }
    
    get specEntity() {
        return Barometer.specEntity;
    }

    static get dataClass() {
        return BarometerData;
    }
    
    get dataClass() {
        return Barometer.dataClass;
    }
}

module.exports.Barometer = Barometer;
