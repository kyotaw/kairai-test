'use strict';

const DataSourceEntity = require('../models/entities/data_source_entity').DataSourceEntity
    , factory = require('../models/data_source_factory');

const dataSourceRepository = {

    async create(dataSource) {
        let entity = await DataSourceEntity.create(dataSource.toDict());
        dataSource.id = entity.id;
        return dataSource;
    },

    async getByHash(hash) {
        const entity = await DataSourceEntity.find({where: {hash: hash}});
        return factory.createFromEntity(entity);
    }
}

module.exports = dataSourceRepository;
