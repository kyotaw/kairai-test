'use strict';

const MonoEntity = require('../models/entities/mono_entity').MonoEntity
    , DataSourceEntity = require('../models/entities/data_source_entity').DataSourceEntity
    , factory = require('../models/mono_factory');

const monoRepository = {

    create(mono) {
        return new Promise((resolve, reject) => {
            MonoEntity.create(mono.toDict()).then((inst) => {
                mono.id = inst.id;
                resolve(mono);
            }, (err) => {
                reject(err);
            });
        });
    },

    get(monoHash) {
        return new Promise((resolve, reject) => {
            MonoEntity.find({ where: { hash: monoHash }}).then((mono) => {
                    if (mono) {
                        mono = factory.createFromEntity(mono);
                    }
                    resolve(mono);
                }, (err) => {
                    reject(err);
                });
        });
    },

    update(mono) {
        return new Promise((resolve, reject) => {
            let monoModel = MonoEntity.build(mono.toDict());
            for (let ds of mono.dataSources) {
                const dsModel = DataSourceEntity.build(ds);
                monoModel.addData_source(dsModel);
            }
            monoModel.update(monoModel, {where: { id: monoModel.id }}).then((monoModel) => {
                resolve(mono);
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = monoRepository;
