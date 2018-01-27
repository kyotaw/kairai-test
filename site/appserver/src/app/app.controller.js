'use strict';

var appController = (function() {

    var inst = {};

    inst.get = function(req, res) {
        res.render('index.html')
    }

    return inst;

})()


module.exports.appController = appController;
