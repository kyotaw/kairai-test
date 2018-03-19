'use strict';

const crypto = require('crypto')
    , hashEnv = require('../env').auth.hash;

function encrypt(text, key, algo) {
    let cipher = crypto.createCipher(algo, key);
    cipher.update(text, 'utf8', 'hex');
    return cipher.final('hex');
}

function decrypt(encryptedText, key, algo) {
    let decipher = crypto.createDecipher(algo, key);
    decipher.update(encryptedText, 'hex', 'utf8');
    return decipher.final('utf8');
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}
