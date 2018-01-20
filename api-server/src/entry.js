'use strict';

const express = require('express')
  , bodyParser = require('body-parser')
  , socketio = require('socket.io')
  , http = require('http')
  , env = require('./env')
  , db = require('./infrastructures/db')
  , cors = require('./middlewares/cors.js')
  , route = require('./routes');

function start() {
	var app = express();
	app.set('port', env.APISERVER_PORT);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors);
    app.use(route());

    const server = http.createServer(app);
    const io = socketio(server);

    db.start().then(() => {
	    server.listen(app.get('port'), () => {
	        console.log('Kairai server is working at ' + env.APISERVER_URL);
        });
    }, (err) => {
        console.error('Kairai server failed starting');
        console.error(err);
    });
}

module.exports = {
    start: start
}
