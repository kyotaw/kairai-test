'use strict';

const UserEntity = require('./entities/user_entity').UserEntity
    , User = require('./user').User;

const userRepository = {

    async create(params) {
        const user = new User(params);
        return User.create(user);
    },

    async getBySocialId(socialUserId, socialLoginSystem) {
        const entity = User.find({where: {socialUserId: socialUserId, socialLoginSystem: socialLoginSystem}});
        return new User(entity);
    }
}

module.exports = userRepository;
