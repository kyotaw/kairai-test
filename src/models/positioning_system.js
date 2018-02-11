'use strict';

const DataSource = require('./data_source').DataSource
    , PositioningSystemSpec = require('./positioning_system_spec').PositioningSystemSpec
    , PositioningSystemSpecEntity = require('./entities/positioning_system_spec_entity').PositioningSystemSpecEntity
    , PositioningSystemData = require('./positioning_system_data').PositioningSystemData;

class PositioningSystem extends DataSource {

    constructor(params) {
        super(params);
    }

    static get specClass() {
        return PositioningSystemSpec;
    }
    
    get specClass() {
        return PositioningSystem.specClass;
    }

    static get specEntity() {
        return PositioningSystemSpecEntity;
    }
    
    get specEntity() {
        return PositioningSystem.specEntity;
    }

    static get dataClass() {
        return PositioningSystemData;
    }
    
    get dataClass() {
        return PositioningSystem.dataClass;
    }
}

module.exports.PositioningSystem = PositioningSystem; 
