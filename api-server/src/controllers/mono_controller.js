'use strict';

const monoService = require('../services/mono_service')
    , response = require('./mono_response')
    , shortcut = require('./response_shortcuts')
    , errorTypes = require('../services/errors').ErrorTypes;

const monoControlelr = {

    create(req, res) {
        monoService.createMono(req.body).then((mono) => {
            shortcut.successResponse(res, mono.toDict());
        }, (err) => {
            shortcut.error500Response(res, err);
        });
    },

    get(req, res) {
        monoService.getMono(req.query).then((mono) => {
            shortcut.successResponse(res, mono.toDict());
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
            shortcut.successResponse(res, dataSource.toDict());
        }, (err) => {
            if (err.errorType === errorTypes.MONO_NOT_FOUND) {
                res.status(400);
                shortcut.errorResponse(res, err); 
            } else {
                shortcut.error500Response(res, err);
            }
        });
    },

    getAllDataSources(req, res) {
        monoService.getAllDataSources(req.params.monoHash).then((dataSources) => {
            shortcut.successResponse(res, response.allDataSourcesResponse(req.params.monoHash, dataSources));
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
