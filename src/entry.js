'use strict';

const express = require('express')
  , bodyParser = require('body-parser')
  , http = require('http')
  , env = require('./env')
  , ip = require('./helpers/ip')
  , db = require('./infrastructures/db')
  , cors = require('./middlewares/cors.js')
  , routes = require('./routes')
  , routes_ws = require('./routes_ws');

async function start() {
	var app = express();
    app.use(cors);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
    app.use(routes());
    
    const server = http.createServer(app);
    routes_ws(server);

    await db.start();
    const host = await ip();
    await server.listen(env.APISERVER_PORT, () => {
        const url = host + ':' + env.APISERVER_PORT;
	    console.log('Kairai server is working at ' + url);
    });
}

module.exports = {
    start: start
}
