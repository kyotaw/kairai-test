'use strict';

class Mono {

    constructor(name, monoId) {
        this.id = null;
        this.name = name;
        this.monoId = monoId;
    }

    toDict() {
        return {
            id: this.id,
            name: this.name,
            modelNumber: this.monoId.modelNumber,
            serialNumber: this.monoId.serialNumber,
            vendorName: this.monoId.vendorName,
        }
    }
}

module.exports.Mono = Mono;
