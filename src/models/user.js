'use strict';

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
