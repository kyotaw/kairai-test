'use strict';

const monoService = require('../services/mono_service')
    , response = require('./mono_response')
    , shortcut = require('./response_shortcuts')
    , errorTypes = require('../errors').ErrorTypes;

const monoControlelr = {

    create(req, res) {
        monoService.createMono(req.body).then((mono) => {
            shortcut.successResponse(res, response.monosResponse(mono));
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
            shortcut.successResponse(res, response.monosResponse(monos)); 
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
            shortcut.successResponse(res, response.dataSourcesResponse(dataSource));
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
            shortcut.successResponse(res, response.dataSourcesResponse(dataSources));
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
