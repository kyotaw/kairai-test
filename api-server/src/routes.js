'use strict';

const Router = require('express').Router
    , monoControlelr = require('./controllers/mono_controller');

function route() {
    const root = '/api/';
    let router = Router();

    // monos
    const monos = root + 'monos/';
    router.post(monos, monoControlelr.create);

    return router;
}

module.exports = route;
