'use strict';

const DataSource = require('./data_source').DataSource
    , CameraSpec = require('./camera_spec').CameraSpec
    , CameraSpecEntity = require('./entities/camera_spec_entity').CameraSpecEntity
    , CameraData = require('./camera_data').CameraData;

class Camera extends DataSource {

    constructor(params) {
        super(params);
    }

    static get specClass() {
        return CameraSpec;
    }
    
    get specClass() {
        return Camera.specClass;
    }

    static get specEntity() {
        return CameraSpecEntity;
    }
    
    get specEntity() {
        return Camera.specEntity;
    }

    static get dataClass() {
        return CameraData;
    }
    
    get dataClass() {
        return Camera.dataClass;
    }
}

module.exports.Camera = Camera; 
