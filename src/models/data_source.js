'use strict';

const ChannelStates = require('./channel_status').ChannelStates
    , GeoLocation = require('./geo_location').GeoLocation;

class DataSource {

    constructor(params) {
        params = params || {}
        this.id = params.id || null;
        this.monoId = params.monoId || null;
        this.name = params.name || '';
        this.productId = params.productId || null;
        this.sourceType = params.sourceType || null;
        this.transferredBytes = params.transferredBytes || 0;
        this.status = params.status || ChannelStates.OFFLINE;
        this.spec = params.spec || {};
        this.specId = params.specId || null;
        this.location = params.location || new GeoLocation(null, null);
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
            status: this.status,
            specId: this.specId,
            spec: this.spec,
            location: this.location.toDict()
        }
    }
}

module.exports = {
    DataSource: DataSource
}
