'use strict';

const ChannelStates = require('../models/channel_status').ChannelStates;

class DataSource {

    constructor(name, productId, sourceType) {
        this.id = null;
        this.monoId = null;
        this.name = name;
        this.productId = productId;
        this.sourceType = sourceType;
        this.transferredBytes = 0;
        this.status = ChannelStates.OFFLINE;
    }

    toDict() {
        return {
            id: this.id,
            monoId: this.monoId,
            name: this.name,
            modelNumber: this.productId.modelNumber,
            serialNumber: this.productId.serialNumber,
            vendorName: this.productId.vendorName,
            hash: this.productId.hash,
            sourceType: this.sourceType,
            transferredBytes: this.transferredBytes,
            monoHash: this.monoHash,
            status: this.status
        }
    }
}

module.exports = {
    DataSource: DataSource
}
