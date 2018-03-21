'use strict';

const hash = require('../helpers/hash')
    , hashEnv = require('../env').auth.hash

class User {

    constructor(params) {
        params = params || {};
        this.id = params.id;
        this.userId = params.userId;
        this.socialUserId = params.socialUserId;
        this.password = params.password;
        this.email = params.email;
        this.name = params.name || params.userId || params.socialUserId || 'guest';
        this.salt = params.salt;
        this.hashVersion = params.hashVersion;
        this.loginSystem = params.loginSystem;
    }

    async setPassword(plainPass) {
        const latestHashEnv = hashEnv.latestVersion;
        this.salt = hash.randomBytes(latestHashEnv.SALT_LENGTH);
        this.password = await hash.pbkdf2(
            plainPass,
            this.salt,
            latestHashEnv.ITERATION,
            latestHashEnv.HASH_LENGTH,
            latestHashEnv.ALGO);
        this.hashVersion = latestHashEnv.VERSION;
    }

    async comparePassword(plainPass) {
        const hashedPass = await hash.pbkdf2(
            plainPass,
            this.salt,
            hashEnv.versions[this.hashVersion].ITERATION,
            hashEnv.versions[this.hashVersion].HASH_LENGTH,
            hashEnv.versions[this.hashVersion].ALGO);
        return this.password === hashedPass;
    }

    async _hashPassword(plainPass) {
        return await hash.pbkdf2(
            password,
            this.salt,
            hashEnv.versions[this.hashVersion].ITERATION,
            hashEnv.versions[this.hashVersion].HASH_LENGTH,
            hashEnv.versions[this.hashVersion].ALGO);
    }

    toDict() {
        return {
            userId: this.userId,
            email: this.email,
            name: this.name,
            socialUserId: this.socialUserId,
            loginSystem: this.loginSystem,
        }
    }
}

module.exports.User = User;
