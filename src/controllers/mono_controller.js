'use strict';

const monoService = require('../services/mono_service')
    , monoResponse = require('./mono_response')
    , dataSourceResponse = require('./data_source_response')
    , shortcut = require('./response_shortcuts')
    , errorTypes = require('../errors').ErrorTypes;

const monoControlelr = {

    create(req, res) {
        monoService.createMono(req.body, req.user).then((mono) => {
            shortcut.successResponse(res, monoResponse.monosResponse(mono));
        }, (err) => {
            if (err.errorType === errorTypes.MONO_ALREADY_EXISTS) {
                res.status(400);
                shortcut.errorResponse(res, err); 
            } else {
                shortcut.error500Response(res, err);
            }
        });
    },

    get(req, res) {
        monoService.getMonos(req.query).then((monos) => {
            shortcut.successResponse(res, monoResponse.monosResponse(monos)); 
        }, (err) => {
            if (err.errorType === errorTypes.MONO_NOT_FOUND) {
                res.status(400);
                shortcut.errorResponse(res, err); 
            } else {
                shortcut.error500Response(res, err);
            }
        });
    },

    addDataSource(req, res) {
        monoService.addDataSource(req.params.monoHash, req.body).then((dataSource) => {
            shortcut.successResponse(res, dataSourceResponse.dataSourcesResponse(dataSource));
        }, (err) => {
            if (err.errorType === errorTypes.MONO_NOT_FOUND || err.errorType === errorTypes.DATA_SOURCE_ALREADY_EXISTS) {
                res.status(400);
                shortcut.errorResponse(res, err); 
            } else {
                shortcut.error500Response(res, err);
            }
        });
    },

    getDataSources(req, res) {
        monoService.getDataSources(req.params.monoHash).then((dataSources) => {
            shortcut.successResponse(res, dataSourceResponse.dataSourcesResponse(dataSources));
        }, (err) => {
            if (err.errorType === errorTypes.MONO_NOT_FOUND) {
                res.status(400);
                shortcut.errorResponse(res, err); 
            } else {
                shortcut.error500Response(res, err);
            }
        });
    }
}

module.exports = monoControlelr;
