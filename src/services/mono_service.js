'use strict';

const factory = require('../models/mono_factory')
    , monoRepository = require('../models/mono_repository')
    , dataSourceFactory = require('../models/data_source_factory')
    , dataSourceRepository = require('../models/data_source_repository')
    , ProductId = require('../models/product_id').ProductId
    , errors = require('../errors');

const monoService = {

    createMono(params) {
        const mono = factory.createFromDict(params);
        return monoRepository.create(mono);
    },

    async getMonos(params) {
        return await monoRepository.get(params);
    },

    async addDataSource(monoHash, params) {
        let monos = await monoRepository.get({hash: monoHash});
        if (monos.length === 0) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND); 
        }
        params['monoHash'] = monoHash;
        const dataSource = dataSourceFactory.createFromDict(params);
        monos[0].addDataSource(dataSource);
        await dataSourceRepository.create(dataSource);
        return dataSource;
    },

    async getAllDataSources(monoHash) {
        let monos = await monoRepository.get({hash: monoHash});
        if (monos.length === 0) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_NOT_FOUND); 
        }
        return monos[0].dataSources;
    }
}

module.exports = monoService;
