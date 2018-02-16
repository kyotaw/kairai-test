'use strict';

const monoRepository = require('../models/mono_repository')
    , dataSourceRepository = require('../models/data_source_repository')
    , ProductId = require('../models/product_id').ProductId
    , errors = require('../errors');

const monoService = {

    async createMono(params) {
        return await monoRepository.create(params);
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
        const dataSource = await dataSourceRepository.create(params);
        monos[0].addDataSource(dataSource);
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
