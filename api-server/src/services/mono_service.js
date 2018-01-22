'use strict';

const factory = require('../models/mono_factory')
    , monoRepository = require('../models/mono_repository')
    , dataSourceFactory = require('../models/data_source_factory')
    , dataSourceRepository = require('../models/data_source_repository')
    , ProductId = require('../models/product_id').ProductId
    , errors = require('../services/errors');

const monoService = {

    createMono(params) {
        const mono = factory.createFromDict(params);
        return monoRepository.create(mono);
    },

    getMono(params) {
        const productId = new ProductId(params.modelNumber, params.serialNumber, params.vendorName);
        return new Promise((resolve, reject) => {
            monoRepository.get(productId.hash).then((mono) => {
                if (mono) {
                    resolve(mono);
                } else {
                    reject(new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND, 'mono not found'));
                }
            }, (err) => {
                reject(err);
            });
       });
    },

    addDataSource(monoHash, params) {
        return new Promise((resolve, reject) => {
            monoRepository.get(monoHash).then((mono) => {
                if (!mono) {
                    reject(new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND, 'mono not found'));
                } else {
                    const dataSource = dataSourceFactory.createFromDict(params);
                    mono.addDataSource(dataSource);
                    return dataSourceRepository.create(dataSource);
                }
            }, (err) => {
                reject(err);
            }).catch((err) => {
                reject(errors.internalError());
            }).then((dataSource) => {
                resolve(dataSource);
            }, (err) => {
                reject(err);
            }).catch((err) => {
                reject(errors.internalError());
            });
        });
    },

    getAllDataSources(monoHash) {
        return new Promise((resolve, reject) => {
            monoRepository.get(monoHash).then((mono) => {
                if (!mono) {
                    reject(new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND, 'mono not found'));
                } else {
                    resolve(mono.dataSources);
                } 
            }, (err) => {
                reject(err);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = monoService;
