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
    },

    delete(req, res) {
        dataSourceService.delete(req.params).then(() => {
            shortcut.successResponse(res);
        }).catch (err => {
            if (err.errorType === errorTypes.DATA_SOURCE_NOT_FOUND) {
                res.status(400);
                shortcut.errorResponse(res, err); 
            } else {
                shortcut.error500Response(res, err);
            }
        });
    }
}

module.exports = dataSourceController;
