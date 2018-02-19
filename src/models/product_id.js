'use strict';

class ProductId {
    
    constructor(modelNumber, serialNumber, vendorName, hash=null) {
        this.modelNumber = modelNumber;
        this.serialNumber = serialNumber;
        this.vendorName = vendorName;
        this.hash = hash
    }
}

module.exports.ProductId = ProductId;
