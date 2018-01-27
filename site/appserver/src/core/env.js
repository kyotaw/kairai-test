'use strict';


const env = (function() {

    const settings = require('../../settings') || {};
    let inst = {};

    inst.APPSERVER_HOST = settings['APPSERVER_HOST'] || 'localhost';
    inst.APPSERVER_PORT = settings['APPSERVER_PORT'] || 7869;

    return inst;
})()

module.exports = env;
