'use strict';


(function(Env) {

	const settings = require('../settings');

    Env.SRC_ROOT_DIR = __dirname;

	Env.DB_HOST = settings.DB_HOST || 'localhost';
    Env.DB_NAME = settings.DB_NAME || 'kairaidb';
    Env.DB_USER_NAME = settings.DB_USER_NAME || 'postgres';
    Env.DB_PASSWORD = settings.DB_PASSWORD || '';

    Env.APISERVER_HOST = settings.APISERVER_HOST || 'localhost';
    Env.APISERVER_PORT = settings.APISERVER_PORT || '6171';
    Env.APISERVER_URL = 'http://' + Env.APISERVER_HOST + ':' + Env.APISERVER_PORT;

}(exports));
