'use strict';

const Router = require('express').Router
    , userController = require('./controllers/user_controller')
    , authController = require('./controllers/auth_controller')
    , monoControlelr = require('./controllers/mono_controller')
    , dataSourceController = require('./controllers/data_source_controller')
    , channelController = require('./controllers/channel_controller')
    , siteController = require('./controllers/site_controller')
    , monoFilter = require('./middlewares/mono_filter')
    , authFilter = require('./middlewares/auth_filter')
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

    // require authentication    
    const authenticate = authFilter.authenticateWithJwt();

    // monos
    const monos = root + 'monos/';
    router.get(monos, authenticate, monoControlelr.get);
    router.post(monos, authenticate, monoControlelr.create);
    
    // monos/data sources
    const mono_dataSources = monos + ':monoHash/data_sources';
    router.get(mono_dataSources, authenticate, monoControlelr.getDataSources);
    router.post(mono_dataSources, authenticate, monoControlelr.addDataSource);

    // datasources
    const dataSources = root + 'data_sources/';
    router.get(dataSources, authenticate, dataSourceController.get);
    router.delete(dataSources + ':hash', authenticate, dataSourceController.delete);

    // channels
    const channels = root + 'channels/';
    router.get(channels + ':channelId', authenticate, channelController.getState);

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
