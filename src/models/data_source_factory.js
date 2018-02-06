'use strict';

const DataSource = require('./data_source').DataSource
    , ProductId = require('./product_id').ProductId
    , AccelerometerSpec = require('./accelerometer_spec').AccelerometerSpec
    , CameraSpec = require('./camera_spec').CameraSpec
    , BarometerSpec = require('./barometer_spec').BarometerSpec
    , GeoLocation = require('./geo_location').GeoLocation;

const specs = {
    accelerometer: AccelerometerSpec,
    camera: CameraSpec,
    barometer: BarometerSpec,
}

const dataSourceFactory = {

    createFromDict(params) {
        if (!params) {
            return null;
        }
        params.productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        params.location = new GeoLocation(params.latitude, params.longitude);
        let dataSource = new DataSource(params);
        params.spec = params.spec || {}
        dataSource.spec = new specs[params.sourceType](params.spec);
        return dataSource;
    },

    async createFromEntity(entity) {
        if (!entity) {
            return null;
        }
        let dataSource = this.createFromDict(entity);
        dataSource.id = entity.id;
        dataSource.monoId = entity.monoId;
        if (entity.spec) {
            dataSource.spec = new specs[entity.sourceType](entity.spec);
        }
        return dataSource;
    },
}

module.exports = dataSourceFactory;
