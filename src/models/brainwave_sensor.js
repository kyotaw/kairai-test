'use strict';

const DataSource = require('./data_source').DataSource
    , BrainWaveSensorSpec = require('./brainwave_sensor_spec').BrainWaveSensorSpec
    , BrainWaveSensorSpecEntity = require('./entities/brainwave_sensor_spec_entity').BrainWaveSensorSpecEntity
    , BrainWaveSensorData = require('./brainwave_sensor_data').BrainWaveSensorData;

class BrainWaveSensor extends DataSource {

    constructor(params) {
        super(params);
    }

    static get specClass() {
        return BrainWaveSensorSpec;
    }

    get specClass() {
        return BrainWaveSensor.specClass;
    }

    static get specEntity() {
        return BrainWaveSensorSpecEntity;
    }
    
    get specEntity() {
        return BrainWaveSensor.specEntity;
    }

    static get dataClass() {
        return BrainWaveSensorData;
    }
    
    get dataClass() {
        return BrainWaveSensor.dataClass;
    }
}

module.exports.BrainWaveSensor = BrainWaveSensor;
