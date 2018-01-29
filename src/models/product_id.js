'use strict';

const sha256 = require('../helpers/hash').sha256;

class ProductId {
    
    constructor(modelNumber, serialNumber, vendorName, hash=null) {
        this.modelNumber = modelNumber;
        this.serialNumber = serialNumber;
        this.vendorName = vendorName;
        this.hash = hash || sha256([modelNumber, serialNumber, vendorName]);
    }
}

module.exports.ProductId = ProductId;
