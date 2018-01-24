'use strict';

const DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , DataSource = require('./data_source').DataSource
    , ProductId = require('./product_id').ProductId;

const dataSourceFactory = {

    createFromDict(params) {
        if (!params) {
            return null;
        }
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        return new DataSource(params.name, productId, params.sourceType);
    },

    createFromEntity(params) {
        if (!params) {
            return null;
        }
        let dataSource = this.createFromDict(params);
        dataSource.id = params.id;
        dataSource.monoId = params.monoId;
        return dataSource;
    }

}

module.exports = dataSourceFactory;
