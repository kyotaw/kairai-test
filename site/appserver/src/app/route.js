'use strict';


const express = require('express')
    , controller = require('./app.controller').appController;

module.exports = function() {
    const router = express.Router();
    router.get('/', controller.get);
    return router;
}
