'use strict';

const Mono = require('./mono').Mono
    , ProductId = require('./product_id').ProductId
    , MonoEntity = require('./entities/mono_entity').MonoEntity
    , dataSourceFactory = require('./data_source_factory')
    , pbkdf2 = require('../helpers/hash').pbkdf2LatestVersion
    , errors = require('../errors');

const monoFactory = {

    async createFromDict(params) {
        let productId = null;
        if (params.hash) {
            productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName, params.hash);
        } else {
            const plainText = [params.modelNumber, params.serialNumber, params.vendorName].join('.');
            const hash = await pbkdf2(plainText);
            productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName, hash);
        }
        params.productId = productId;
        return new Mono(params);
    },

    async createFromEntity(params) {
        let mono = await monoFactory.createFromDict(params);
        mono.id = params.id;
        return mono;
    }
}

module.exports = monoFactory;
