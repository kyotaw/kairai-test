'use strict';

const dataSourceService = require('../services/data_source_service')
    , dataSourceResponse = require('./data_source_response') 
    , shortcut = require('./response_shortcuts')
    , errorTypes = require('../errors').ErrorTypes;

const dataSourceController = {
    
    get(req, res) {
        dataSourceService.getAll().then(dataSources => {
            shortcut.successResponse(res, dataSourceResponse.dataSourcesResponse(dataSources));
        }).catch (err => {
            shortcut.error500Response(res, err);
        });
    }
}

module.exports = dataSourceController;
