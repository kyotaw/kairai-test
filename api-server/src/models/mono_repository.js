'use strict';

const MonoEntity = require('../models/entities/mono_entity').MonoEntity
    , DataSourceEntity = require('../models/entities/data_source_entity').DataSourceEntity
    , factory = require('../models/mono_factory')
    , errors = require('../errors');

const monoRepository = {

    async create(mono) {
        let exists = await this.get(mono.toDict());
        if (exists.length > 0) {
            throw new errors.KairaiError(errors.ErrorTypes.MONO_ALREADY_EXISTS);
        }
        let entity = await MonoEntity.create(mono.toDict());
        mono.id = entity.id;
        return mono;
    },

    async get(queryParams) {
        const entities = await MonoEntity.findAll(this._buildQuery(queryParams));
        let monos = [];
        for (let e of entities) {
            const mono = await factory.createFromEntity(e);
            monos.push(mono);
        }
        return monos; 
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

    _buildQuery(params) {
        let query = {};
        query.where = {};
        if (params.userId) {
            //
        }
        if (params.hash) {
            query.where.hash = params.hash;
        } else if (params.modelNumber) {
            query.where.modelNumber = params.modelNumber;
            query.where.serialNumber = params.serialNumber;
            query.where.vendorName = params.vendorName;
        }
        return query
    }
}

module.exports = monoRepository;
