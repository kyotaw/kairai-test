'use strict';

const UserEntity = require('./entities/user_entity').UserEntity
    , User = require('./user').User;

const userRepository = {

    async create(params) {
        const entity = UserEntity.create(params);
        return new User(params);
    },

    async getById(id) {
        const entity = await UserEntity.find({where: {id: id}});
        return entity ? new User(entity) : null;
    },
    
    async getByUserId(userId) {
        const entity = await UserEntity.find({where: {userId: userId}});
        return entity ? new User(entity) : null;
    },

    async getByUserId(userId) {
        const entity = await UserEntity.find({where: {userId: userId}});
        return entity ? new User(entity) : null;
    },

    async getBySocialId(socialUserId, loginSystem) {
        const entity = await UserEntity.find({where: {socialUserId: socialUserId, loginSystem: loginSystem}});
        return entity ? new User(entity) : null;
    }
}

module.exports = userRepository;
