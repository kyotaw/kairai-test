'use strict';

const express = require('express')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , passport = require('passport')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , env = require('./env')
  , ip = require('./helpers/ip')
  , db = require('./infrastructures/db')
  , cors = require('./middlewares/cors.js')
  , decodeQuery = require('./middlewares/query_decoder.js').decodeQuery
  , routes = require('./routes')
  , routes_ws = require('./routes_ws');

async function start() {
	var app = express();
    app.use(cors);
    app.use(passport.initialize());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
    app.use(decodeQuery);

    // site
    app.use(cookieParser());
    app.set('views', path.join(path.resolve(''), 'public/frontend/dist'));
    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile);
    app.use('/static', express.static(path.join(path.resolve(''), 'public')));

    // routing
    app.use(routes());
    const server = http.createServer(app);
    routes_ws(server);

    await db.start();
    server.listen(env.APISERVER_PORT, () => {
	    console.log('Kairai server is working');
    });
}

module.exports = {
    start: start
}
