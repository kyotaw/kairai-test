'use strict';

const db = require('../../infrastructures/sequelizedb');


const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        name: { type: db.Sequelize.STRING, allowNull: false },
        modelNumber: { type: db.Sequelize.STRING, allowNull: false },
        serialNumber: { type: db.Sequelize.STRING, allowNull: false },
        vendorName: { type: db.Sequelize.STRING, allowNull: false },
    }
}

const MonoEntity = db.define('mono', schema);

module.exports = {
    MonoEntity: MonoEntity,
    schema: schema
}
