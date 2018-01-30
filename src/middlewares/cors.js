'use strict';

function allowCORS(req, res, next) {
    const origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, HEAD, OPTIONS');
    next();
}

module.exports = allowCORS;
