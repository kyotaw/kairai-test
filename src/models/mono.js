'use strict';

const MonoEntity = require('./entities/mono_entity').MonoEntity
    , DataSource = require('./data_source').DataSource;

class Mono {

    constructor(params) {
        this.id = params.id;
        this.productId = params.productId;
        this.name = params.name;
        this.ownerId = params.ownerId;
        this.dataSources = [];
    }

    addDataSource(dataSource) {
        dataSource.monoId = this.id;
        dataSource.monoHash = this.productId.hash;
        this.dataSources.push(dataSource);
    }

    toDict() {
        return {
            id: this.id,
            name: this.name,
            modelNumber: this.productId.modelNumber,
            serialNumber: this.productId.serialNumber,
            vendorName: this.productId.vendorName,
            hash: this.productId.hash,
            ownerId: this.ownerId,
        }
    }
}

module.exports.Mono = Mono;
