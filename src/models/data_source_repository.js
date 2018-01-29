'use strict';

const DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , dataSourceFactory = require('./data_source_factory')
    , channelRepository = require('./channel_repository');

const dataSourceRepository = {

    async create(dataSource) {
        let entity = await DataSourceEntity.create(dataSource.toDict());
        dataSource.id = entity.id;
        return dataSource;
    },

    async getByHash(hash) {
        const entity = await DataSourceEntity.find({where: {hash: hash}});
        let dataSource = await dataSourceFactory.createFromEntity(entity);
        return await this._fetch_state(dataSource);
    },

    async getByMonoHash(monoHash) {
        const entities = await DataSourceEntity.findAll({where: {monoHash: monoHash}});
        return await this._createFromEntity(entities);
    },

    async getAll() {
        const entities = await DataSourceEntity.findAll();
        return await this._createFromEntity(entities);
    },

    async _createFromEntity(entities) {
        let sources = [];
        for (let e of entities) {
            let source = await dataSourceFactory.createFromEntity(e);
            source = await this._fetch_state(source);
            sources.push(source);
        }
        return sources;
    },

    async _fetch_state(dataSource) {
        const channel = await channelRepository.get(dataSource.productId.hash);
        if (channel) {
            dataSource.status = channel.status.state;
        }
        return dataSource;
    }
}

module.exports = dataSourceRepository;
