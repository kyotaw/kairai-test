'use strict';

const crypto = require('crypto');

function sha256(data) {
    const algo = crypto.createHash('sha256');
    for (let d of data) {
        algo.update(d);
    }
    return algo.digest('hex');
}

module.exports = {
    sha256: sha256
}
