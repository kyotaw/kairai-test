'use strict';

const db = require('../../infrastructures/sequelizedb')
    , MonoEntity = require('./mono_entity').MonoEntity;

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        userId: { type: db.Sequelize.STRING, allowNull: true, unique: true },
        password: { type: db.Sequelize.STRING, allowNull: true },
        email: { type: db.Sequelize.TEXT, isEmail: true, allowNull: true },
        name: { type: db.Sequelize.STRING, allowNull: false },
        socialUserId: { type: db.Sequelize.STRING, allowNull: true },
        socialLoginSystem: { type: db.Sequelize.STRING, allowNull: true },
    }
}

const UserEntity = db.define('user', schema);
UserEntity.hasMany(MonoEntity);

module.exports = {
    UserEntity: UserEntity,
    schema: schema
}
