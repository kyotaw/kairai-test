'use strict';

const db = require('../../infrastructures/sequelizedb');

const schema = {
    properties: {
        id: { type: db.Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        name: { type: db.Sequelize.STRING, allowNull: false },
        modelNumber: { type: db.Sequelize.STRING, allowNull: false },
        serialNumber: { type: db.Sequelize.STRING, allowNull: false },
        vendorName: { type: db.Sequelize.STRING, allowNull: false },
        sourceType: { type: db.Sequelize.STRING, allowNull: false }, 
        transferredBytes: { type: db.Sequelize.BIGINT, allowNull: false, defaultValue: 0 }, 
    }
}

const DataSourceEntity = db.define('data_source', schema);

module.exports = {
    DataSourceEntity: DataSourceEntity,
    schema: schema
}
