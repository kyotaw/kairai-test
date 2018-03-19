'use strict';

const MonoEntity = require('./entities/mono_entity').MonoEntity
    , DataSourceEntity = require('./entities/data_source_entity').DataSourceEntity
    , dataSourceRepository = require('./data_source_repository')
    , factory = require('./mono_factory')
    , errors = require('../errors');

const monoRepository = {

    async create(params) {
        const mono = await factory.createFromDict(params);
        let entity = await MonoEntity.create(mono.toDict());
        mono.id = entity.id;
        return mono;
    },

    async getByUserId(userId) {
        const entities = await MonoEntity.findAll({where: {ownerId: userId}});
        let monos = [];
        for (let e of entities) {
            const mono = await this._buildMono(e); 
            monos.push(mono);
        }
        return monos;
    },

    async getByHash(hash, userId) {
        let query = { hash: hash };
        if (userId) {
            query.ownerId = userId
        }
        const entity = await MonoEntity.find({where: query});
        if (!entity) {
            return null;
        }
        return await this._buildMono(entity); 
    },

    async getByProductId(productId, userId) {
        let query = {
            modelNumber: productId.modelNumber,
            serialNumber: productId.serialNumber,
            vendorName: productId.vendorName
        }
        if (userId) {
            query.ownerId= userId
        }
        const entity = await MonoEntity.find({where: query});
        return await this._buildMono(entity); 
    },

    async update(mono) {
        let monoModel = MonoEntity.build(mono.toDict());
        for (let ds of mono.dataSources) {
            const dsModel = DataSourceEntity.build(ds);
            monoModel.addData_source(dsModel);
        }
        await monoModel.update(monoModel, {where: { id: monoModel.id }});
        return mono;
    },

    async _buildMono(entity) {
        if (!entity) {
            return null;
        }
        const mono = await factory.createFromEntity(entity);
        mono.dataSources = await dataSourceRepository.getByMonoHash(mono.productId.hash);
        return mono;
    }
}

module.exports = monoRepository;
