'use strict';

class MonoId {
    
    constructor(modelNumber, serialNumber, vendorName) {
        this.modelNumber = modelNumber;
        this.serialNumber = serialNumber;
        this.vendorName = vendorName;
    }
}

module.exports.MonoId = MonoId;
