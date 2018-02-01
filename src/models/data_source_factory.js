'use strict';

const DataSource = require('./data_source').DataSource
    , ProductId = require('./product_id').ProductId
    , AccelerometerSpec = require('./accelerometer_spec').AccelerometerSpec;

const specs = {
    accelerometer: AccelerometerSpec
}

const dataSourceFactory = {

    createFromDict(params) {
        if (!params) {
            return null;
        }
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        let dataSource = new DataSource(params.name, productId, params.sourceType);
        dataSource.spec = params.spec || {}
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
