'use strict';

const MonoEntity = require('./entities/mono_entity').MonoEntity
    , DataSource = require('./data_source').DataSource;

class Mono {

    constructor(name, productId) {
        this.id = null;
        this.productId = productId;
        this.name = name;
        this.dataSources = [];
    }

    addDataSource(dataSource) {
        dataSource.monoId = this.id;
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
        }
    }
}

module.exports.Mono = Mono;
