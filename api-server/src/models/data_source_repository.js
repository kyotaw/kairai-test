'use strict';

const DataSourceEntity = require('../models/entities/data_source_entity').DataSourceEntity;

const dataSourceRepository = {

    create(dataSource) {
        return new Promise((resolve, reject) => {
            DataSourceEntity.create(dataSource.toDict()).then((inst) => {
                dataSource.id = inst.id;
                resolve(dataSource);
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = dataSourceRepository;
