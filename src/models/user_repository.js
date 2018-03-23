'use strict';

const UserEntity = require('./entities/user_entity').UserEntity
    , User = require('./user').User
    , monoRepository = require('./mono_repository');

const userRepository = {

    async create(params) {
        const entity = UserEntity.create(params);
        return new User(params);
    },

    async getByEmail(email) {
        const entity = await UserEntity.find({where: {email: email}});
        return entity ? new User(entity) : null;
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
    },

    async update(user, keys) {
        let params = {};
        for (let key of keys) {
            if (user[key] !== undefined) {
                params[key] = user[key];
            }
        }
        await UserEntity.update(params, {where: { id: user.id }});
        return user;
    },

    async delete(userId) {
        await monoRepository.deleteByUserId(userId);
        await UserEntity.destroy({ where: { userId: userId } });
    }
}

module.exports = userRepository;
