'use strict';

const DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , AccelerometerSpecEntity = require('./entities/accelerometer_spec_entity').AccelerometerSpecEntity
    , CameraSpecEntity = require('./entities/camera_spec_entity').CameraSpecEntity
    , BarometerSpecEntity = require('./entities/barometer_spec_entity').BarometerSpecEntity
    , dataSourceFactory = require('./data_source_factory')
    , channelRepository = require('./channel_repository')
    , Op = require('../infrastructures/sequelizedb').Sequelize.Op;

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
        let entity = DataSourceEntity.build(dataSource.toDict());
        entity.latitude = dataSource.location.latitude;
        entity.longitude = dataSource.location.longitude;
        await entity.save();
        dataSource.id = entity.id;
        if (specEntity) {
            specEntity.setData_source(entity);
        }
        return dataSource;
    },

    async update(dataSource) {
        await dataSource.save();
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

    async getByGeoBounds(bounds, dataSourceType) {
        const entities = await DataSourceEntity.findAll({
            where: {
                [Op.and]: [
                    {
                        latitude: {
                            [Op.and]: {
                                [Op.gte]: bounds.leftBottom.latitude,
                                [Op.lte]: bounds.rightTop.latitude,
                            }
                        }    
                    },
                    {
                        longitude: {
                            [Op.and]: {
                                [Op.gte]: bounds.leftBottom.longitude,
                                [Op.lte]: bounds.rightTop.longitude
                            }
                        }
                    }
                ],
                dataSourceType: dataSourceType
            }
        });
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
