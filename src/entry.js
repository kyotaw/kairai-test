'use strict';

const express = require('express')
  , bodyParser = require('body-parser')
  , socketio = require('socket.io')
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
    app.use(cors);

    const server = http.createServer(app);
    const io = socketio(server);
    routes_ws(io);

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
