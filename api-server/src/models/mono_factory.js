'use strict';

const Mono = require('./mono').Mono
    , ProductId = require('./product_id').ProductId
    , MonoEntity = require('./entities/mono_entity').MonoEntity
    , dataSourceFactory = require('./data_source_factory')
    , errors = require('../errors');

const monoFactory = {

    createFromDict(params) {
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        return new Mono(params.name, productId);
    },

    async createFromEntity(params) {
        let mono = monoFactory.createFromDict(params);
        mono.id = params.id;
        return mono;
    }
}

module.exports = monoFactory;
