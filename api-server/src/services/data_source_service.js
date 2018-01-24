'use strict';

const repository = require('../models/data_source_repository.js');

const dataSourceService = {

    async get(params) {
        if (params.hash) {
            return [await repository.getByHash(params.hash)];
        } else {
            return [];
        }
    }

}

module.exports = dataSourceService;
