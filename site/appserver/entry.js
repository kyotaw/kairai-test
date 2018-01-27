'use strict';

const env = require('./src/core/env')
    , route = require('./route')
    , express = require('express')
    , ejs = require('ejs')
    , bodyParser = require('body-parser')
    , path = require('path')
    , http = require('http');

let app = express();
app.set('port', env.APPSERVER_PORT);
app.set('views', path.join(path.resolve(''), 'public/frontend/dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use('/static', express.static(path.join(path.resolve(''), 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

route(app);

function start() {
    http.createServer(app).listen(app.get('port'), function() {
        console.log('nextwf site running at ' + env.APPSERVER_HOST + ':' + env.APPSERVER_PORT);
    });
}

module.exports.start = start;
