'use strict';

const crypto = require('crypto');

function sha256(data) {
    const algo = crypto.createHash('sha256');
    for (let d of data) {
        algo.update(d);
    }
    return algo.digest('hex');
}

function pbkdf2(password, salt, iterations, keylen, algo, cb) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keylen, algo, (err, key) => {
            if (err) {
                reject(err);
            } else {
                let s = key.toString('hex');
                resolve(key.toString('hex'));
            }
        });
    });
}

function randomBytes(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
}

module.exports = {
    sha256: sha256,
    pbkdf2: pbkdf2,
    randomBytes: randomBytes
}
