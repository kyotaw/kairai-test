'use strict';

const DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , AccelerometerSpecEntity = require('./entities/accelerometer_spec_entity').AccelerometerSpecEntity
    , CameraSpecEntity = require('./entities/camera_spec_entity').CameraSpecEntity
    , BarometerSpecEntity = require('./entities/barometer_spec_entity').BarometerSpecEntity
    , dataSourceFactory = require('./data_source_factory')
    , channelRepository = require('./channel_repository');

const specs = {
    accelerometer: AccelerometerSpecEntity,
    camera: CameraSpecEntity,
    barometer: BarometerSpecEntity,
}

const dataSourceRepository = {

    async create(dataSource) {
        let specEntity = null;
        if (specs[dataSource.sourceType]) {
            specEntity = await specs[dataSource.sourceType].create(dataSource.spec.toDict());
            dataSource.specId = specEntity.id;
        }
        let entity = await DataSourceEntity.create(dataSource.toDict());
        dataSource.id = entity.id;
        if (specEntity) {
            specEntity.setData_source(entity);
        }
        return dataSource;
    },

    async getByHash(hash) {
        const entity = await DataSourceEntity.find({where: {hash: hash}});
        await this._populateSpec(entity);
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
            await this._populateSpec(e);
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
    },

    async _populateSpec(entity) {
        if (!specs[entity.sourceType]) {
            entity.spec = null;
        } else {
            entity.spec = await specs[entity.sourceType].findById(entity.specId);
        }
        return entity;
    },
}

module.exports = dataSourceRepository;
