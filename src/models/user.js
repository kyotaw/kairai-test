'use strict';

class User {

    constructor(params) {
        params = params || {};
        this.userId = params.userId || null;
        this.email = params.email || null;
        this.socialUserId = params.socialUserId || null;
        this.socialLoginSystem = params.socialLoginSystem || null;
        this.name = params.name || params.userId || params.socialUserId || 'guest';
    }

    toDict() {
        return {
            userId: this.userId,
            email: this.email,
            name: this.name,
            socialUserId: this.socialUserId,
            socialLoginSystem: this.socialLoginSystem,
        }
    }
}

module.exports.User = User;
