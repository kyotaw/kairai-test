'use strict';

const dataSourceRepository = require('../models/data_source_repository')
    , channelRepository = require('../models/channel_repository');

const dataSourceService = {

    async get(params) {
        if (params.hash) {
            return [await dataSourceRepository.getByHash(params.hash)];
        } else {
            return [];
        }
    },

    async getAll() {
        return await dataSourceRepository.getAll();
    },

}

module.exports = dataSourceService;
