'use strict';


(function(Env) {
    
    let settings = {};
    try {
	    settings = require('../settings');
    } catch (e) {
        console.log('Lot Settings.js failed');
    }

    Env.SRC_ROOT_DIR = __dirname;

	Env.DB_HOST = process.env.DB_HOST || settings.DB_HOST || 'localhost';
    Env.DB_NAME = process.env.DB_NAME || settings.DB_NAME || 'kairaidb';
    Env.DB_USER_NAME = process.env.DB_USER_NAME || settings.DB_USER_NAME || 'postgres2';
    Env.DB_PASSWORD = process.env.DB_PASSWORD || settings.DB_PASSWORD || '';
    Env.DATABASE_URL = process.env.DATABASE_URL || settings.DATABASE_URL || '';

    Env.APISERVER_HOST = process.env.APISERVER_HOST || settings.APISERVER_HOST || 'localhost';
    Env.APISERVER_PORT = process.env.PORT || settings.APISERVER_PORT || '6171';
    Env.APISERVER_URL = process.env.APISERVER_URL || settings.APISERVER_URL || Env.APISERVER_HOST + ':' + Env.APISERVER_PORT;

    Env.server = {
        root: process.env.SERVER_ROOT || settings.SERVER_ROOT || 'http://localhost/',
    }

    Env.auth = {
        hash: {
            versions: [
                {
                    HASH_LENGTH: process.env.AUTH_HASH_LENGTH_V0 || 64,
                    SALT_LENGTH: process.env.AUTH_HASH_LENGTH_V0 || 16,
                    ITERATION: process.env.AUTH_HASH_ITERATION_V0 || 100000,
                    ALGO: process.env.AUTH_HASH_ALGO_V0 || 'sha512',
                    VERSION: process.env.AUTH_HASH_VERSION_V0 || 0
                }
            ],
            get latestVersion() {
                return Env.auth.hash.versions[Env.auth.hash.versions.length - 1];
            } 
        },
        accessToken: {
            JWT_KEY: process.env.AUTH_JWT_PUBLIC_KEY || settings.AUTH_JWT_PUBLIC_KEY || null,
            JWT_SECRET: process.env.AUTH_JWT_SECRET_KEY || settings.AUTH_JWT_SECRET_KEY || null,
            JWT_ISSURE: process.env.AUTH_JWT_ISSURE || settings.AUTH_JWT_ISSURE || null,
            JWT_AUDIENCE: process.env.AUTH_JWT_AUDIENCE || settings.AUTH_JWT_AUDIENCE || null,
            JWT_EXPIRES_IN: process.env.AUTH_JWT_EXPIRES_IN || settings.AUTH_JWT_EXPIRES_IN || '1 hour',
        },
        google: {
            CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID || settings.GOOGLE_AUTH_CLIENT_ID || '',
            CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET || settings.GOOGLE_AUTH_CLIENT_SECRET || '',
            CALLBACK_URL: process.env.GOOGLE_AUTH_CALLBACK_URL || settings.GOOGLE_AUTH_CALLBACK_URL || '',
            CALLBACK_PATH: process.env.GOOGLE_AUTH_CALLBACK_PATH || settings.GOOGLE_AUTH_CALLBACK_PATH || '',
        }
    }

}(exports));
