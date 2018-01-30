'use strict';

const Router = require('express').Router
    , monoControlelr = require('./controllers/mono_controller')
    , dataSourceController = require('./controllers/data_source_controller')
    , monoFilter = require('./middlewares/mono_filter')
    , errors = require('./errors')
    , shortcut = require('./controllers/response_shortcuts');

function routes() {
    const root = '/api/';
    let router = Router();

    // monos
    const monos = root + 'monos/';
    router.get(monos, monoFilter.validate_get, monoControlelr.get);
    router.post(monos, monoFilter.validate_create, monoControlelr.create);
    
    // monos/data sources
    const mono_dataSources = monos + ':monoHash/data_sources';
    router.get(mono_dataSources, monoControlelr.getAllDataSources);
    router.post(mono_dataSources, monoControlelr.addDataSource);

    // datasources
    const dataSources = root + 'data_sources/';
    router.get(dataSources, dataSourceController.get);

    // error
    router.use((err, req, res, next) => {
        res.status(err.status || 500);
        if (err instanceof errors.KairaiError) {
            shortcut.errorResponse(res, err);
        } else {
            shortcut.errorResponse(res);
        }
    });

    return router;
}

module.exports = routes;