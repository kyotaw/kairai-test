'use strict';

const monoRepository = require('../models/mono_repository')
    , userRepository = require('../models/user_repository')
    , dataSourceRepository = require('../models/data_source_repository')
    , ProductId = require('../models/product_id').ProductId
    , errors = require('../errors');

const monoService = {

    async createMono(params, user) {
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        let mono = await monoRepository.getByProductId(productId);
        if (mono) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_ALREADY_EXISTS);
        }
        params.ownerId = user.userId;
        return await monoRepository.create(params);
    },

    async getMonos(params) {
        if (params.userId) {
            const user = await userRepository.getByUserId(params.userId);
            if (!user) {
                return [];
            }
            const mono = await monoRepository.getByUserId(user.id);
            return mono ? [mono] : [];
        } else if (params.monoHash) {
            const mono = await monoRepository.getByHash(params.monoHash);
            return mono ? [mono] : [];
        } else if (params.modelNumber) {
            const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
            const mono = await monoRepository.getByProductId(productId);
            return mono ? [mono] : [];
        } else {
            return [];
        }
    },

    async addDataSource(monoHash, params) {
        if (!await monoRepository.getByHash(monoHash)) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND); 
        }
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        if (await dataSourceRepository.getByProductId(productId)) {
            throw new errors.KairaiError(errors.ErrorTypes.DATA_SOURCE_ALREADY_EXISTS); 
        }
        
        params['monoHash'] = monoHash;
        return await dataSourceRepository.create(params);
    },

    async getDataSources(monoHash) {
        let mono = await monoRepository.getByHash(monoHash);
        if (!mono) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND); 
        }
        return mono.dataSources;
    }
}

module.exports = monoService;
