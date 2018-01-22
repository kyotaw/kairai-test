'use strict';

const Router = require('express').Router
    , monoControlelr = require('./controllers/mono_controller');

function route() {
    const root = '/api/';
    let router = Router();

    // monos
    const monos = root + 'monos/';
    router.get(monos, monoControlelr.get);
    router.post(monos, monoControlelr.create);
    const dataSources = monos + ':monoHash';
    router.get(dataSources, monoControlelr.getAllDataSources);
    router.post(dataSources, monoControlelr.addDataSource);

    return router;
}

module.exports = route;
