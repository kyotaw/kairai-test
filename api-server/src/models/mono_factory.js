'use strict';

const Mono = require('./mono').Mono
    , ProductId = require('./product_id').ProductId
    , MonoEntity = require('./entities/mono_entity').MonoEntity
    , dataSourceFactory = require('./data_source_factory')
    , errors = require('../services/errors');

const monoFactory = {

    createFromDict(params) {
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        return new Mono(params.name, productId);
    },

    async createFromEntity(params) {
        let mono = monoFactory.createFromDict(params);
        mono.id = params.id;
        const dataSources = await params.getData_sources();
        for (let dsParams of dataSources) {
            const ds = dataSourceFactory.createFromEntity(dsParams);
            mono.dataSources.push(ds);
        }
        return mono;
    }
}

module.exports = monoFactory;
