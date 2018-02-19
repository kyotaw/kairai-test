'use strict';

const DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , dataSourceFactory = require('./data_source_factory')
    , channelRepository = require('./channel_repository')
    , removeNull = require('../helpers/object').removeNull
    , Op = require('../infrastructures/sequelizedb').Sequelize.Op;

const dataSourceRepository = {

    async create(params) {
        let dataSource = await dataSourceFactory.createFromDict(params);
        let specEntity = null;
        if (dataSource.specEntity) {
            specEntity = await dataSource.specEntity.create(removeNull(dataSource.spec.toDict()));
            dataSource.specId = specEntity.id;
        }
        let entity = this._buildDataSourceEntity(dataSource);
        await entity.save();
        dataSource.id = entity.id;
        if (specEntity) {
            specEntity.setData_source(entity);
        }
        return dataSource;
    },

    async deleteByHash(hash) {
        let dataSource = await this.getByHash(hash);
        if (!dataSource) {
            return false;
        }
        await dataSource.specEntity.destroy({where: {id: dataSource.specId}});
        await DataSourceEntity.destroy({where: {id: dataSource.id}});
        return true;
    },

    async update(dataSource) {
        const entity = await DataSourceEntity.find({where: {hash: dataSource.productId.hash}});
        if (!entity) {
            return;
        }
        let params = this._buildDataSourceEntity(dataSource).dataValues;
        delete params['createdAt'];
        await entity.update(params);
    },

    async getByHash(hash) {
        const entity = await DataSourceEntity.find({where: {hash: hash}});
        if (!entity) {
            return null;
        }
        await this._populateSpec(entity);
        let dataSource = await dataSourceFactory.createFromEntity(entity);
        return await this._fetch_state(dataSource);
    },
    
    async getByProductId(productId) {
        const query = {
            where: {
                modelNumber: productId.modelNumber,
                serialNumber: productId.serialNumber,
                vendorName: productId.vendorName
            }
        };
        const entity = await DataSourceEntity.find(query);
        if (!entity) {
            return null;
        }
        await this._populateSpec(entity);
        let dataSource = await dataSourceFactory.createFromEntity(entity);
        return await this._fetch_state(dataSource);
    },

    async getByMonoHash(monoHash) {
        const entities = await DataSourceEntity.findAll({where: {monoHash: monoHash}});
        return await this._createFromEntity(entities);
    },

    async getByGeoBounds(bounds, sourceType) {
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
                sourceType: sourceType
            }
        });
        return await this._createFromEntity(entities);
    },

    async getAll() {
        const entities = await DataSourceEntity.findAll({order: [['createdAt', 'DESC']] });
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
        const specEntity = dataSourceFactory.getSourceClass(entity.sourceType).specEntity;
        if (!specEntity) {
            entity.spec = null;
        } else {
            entity.spec = await specEntity.findById(entity.specId);
        }
        return entity;
    },

    _buildDataSourceEntity(dataSource) {
        let entity = DataSourceEntity.build(dataSource.toDict());
        if (dataSource.location) {
            entity.latitude = dataSource.location.latitude;
            entity.longitude = dataSource.location.longitude;
        }
        return entity; 
    }
}

module.exports = dataSourceRepository;
