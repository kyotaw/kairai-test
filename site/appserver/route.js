'use strict';


const appRoute = require('./src/app/route');

module.exports = function(app) {
 
    app.use('/', appRoute());

    // not found
    app.use(function(res, req, next) {
        let err = new Error("Not found");
        err.status = 404;
        next(err);
    });

    // stack trace
    if (app.get("env") === "development") {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({ "status": err });
        }); 
    }

    // no stack trace
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({ "status": err });
    });

}

