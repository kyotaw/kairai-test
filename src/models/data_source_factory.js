'use strict';

const DataSource = require('./data_source').DataSource
    , DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , ProductId = require('./product_id').ProductId
    , pbkdf2 = require('../helpers/hash').pbkdf2LatestVersion
    , Accelerometer = require('./accelerometer').Accelerometer
    , Camera = require('./camera').Camera
    , Barometer = require('./barometer').Barometer
    , PositioningSystem = require('./positioning_system').PositioningSystem
    , BrainWaveSensor = require('./brainwave_sensor').BrainWaveSensor
    , GeoLocation = require('./geo_location').GeoLocation;

const sources = {
    accelerometer: Accelerometer,
    camera: Camera,
    barometer: Barometer,
    positioningSystem: PositioningSystem,
    brainwaveSensor: BrainWaveSensor,
}

const dataSourceFactory = {

    async createFromDict(params) {
        if (!params || !sources[params.sourceType]) {
            return null;
        }

        let productId = null;
        if (params.hash) {
            productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName, params.hash);
        } else {
            const plainText = [params.modelNumber, params.serialNumber, params.vendorName].join('.');
            const hash = await pbkdf2(plainText);
            productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName, hash);
        }
        params.productId = productId;

        if (params.latitude && params.longitude) {
            params.location = new GeoLocation(params.latitude, params.longitude);
        }
        let dataSource = new sources[params.sourceType](params);
        params.spec = params.spec || {}
        dataSource.spec = new dataSource.specClass(params.spec);
        return dataSource;
    },

    async createFromEntity(entity) {
        if (!entity) {
            return null;
        }
        let params = entity.dataValues;
        if (params.latitude === DataSourceEntity.INVALID_LATITUDE ||
            params.longitude === DataSourceEntity.INVALID_LONGITUDE) {
            params.latitude = null;
            params.longitude = null;
        }
        let dataSource = await this.createFromDict(params);
        dataSource.id = entity.id;
        dataSource.monoId = entity.monoId;
        if (entity.spec) {
            dataSource.spec = new dataSource.specClass(entity.spec);
        }
        return dataSource;
    },

    getSourceClass(sourceType) {
        return sources[sourceType] || DataSource;
    }
}

module.exports = dataSourceFactory;
