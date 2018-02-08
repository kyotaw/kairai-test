'use strict';

const DataSource = require('./data_source').DataSource
    , DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , ProductId = require('./product_id').ProductId
    , AccelerometerSpec = require('./accelerometer_spec').AccelerometerSpec
    , CameraSpec = require('./camera_spec').CameraSpec
    , BarometerSpec = require('./barometer_spec').BarometerSpec
    , PositioningSystemSpec= require('./positioning_system_spec').PositioningSystemSpec
    , GeoLocation = require('./geo_location').GeoLocation;

const specs = {
    accelerometer: AccelerometerSpec,
    camera: CameraSpec,
    barometer: BarometerSpec,
    positioningSystem: PositioningSystemSpec,
}

const dataSourceFactory = {

    createFromDict(params) {
        if (!params) {
            return null;
        }
        params.productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        if (params.latitude && params.longitude) {
            params.location = new GeoLocation(params.latitude, params.longitude);
        }
        let dataSource = new DataSource(params);
        params.spec = params.spec || {}
        dataSource.spec = new specs[params.sourceType](params.spec);
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
        let dataSource = this.createFromDict(params);
        dataSource.id = entity.id;
        dataSource.monoId = entity.monoId;
        if (entity.spec) {
            dataSource.spec = new specs[entity.sourceType](entity.spec);
        }
        return dataSource;
    },
}

module.exports = dataSourceFactory;
