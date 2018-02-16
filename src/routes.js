'use strict';

const Router = require('express').Router
    , userController = require('./controllers/user_controller')
    , authController = require('./controllers/auth_controller')
    , monoControlelr = require('./controllers/mono_controller')
    , dataSourceController = require('./controllers/data_source_controller')
    , channelController = require('./controllers/channel_controller')
    , siteController = require('./controllers/site_controller')
    , monoFilter = require('./middlewares/mono_filter')
    //, socialLogin = require('./middlewares/social_login')
    , errors = require('./errors')
    , shortcut = require('./controllers/response_shortcuts');

function routes() {
    const root = '/api/';
    let router = Router();

    // auth
    const auth = root + 'auth/';
    router.get(auth + 'login/', authController.login);
    //router.get(auth + 'google/login', socialLogin.authenticateByGoogle());
    //router.get(auth + 'google/callback', socialLogin.callbackFromGoogle(), siteController.loggedin);

    // users
    const users = root + 'users/';
    router.post(users, userController.create);

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
    router.delete(dataSources + ':hash', dataSourceController.delete);

    // channels
    const channels = root + 'channels/';
    router.get(channels + ':channelId', channelController.getState);

    // error
    router.use((err, req, res, next) => {
        res.status(err.status || 500);
        if (err instanceof errors.KairaiError) {
            shortcut.errorResponse(res, err);
        } else {
            next(err);
        }
    });

    return router;
}

module.exports = routes;
