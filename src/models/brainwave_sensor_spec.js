'use strict';

class BrainWaveSensorSpec {

    constructor(params) {
        params = params || {};
        this.channels_10_20 = params.channels_10_20 || [];
        this.channels = params.channels || 0;
    }

    toDict() {
        return {
            channels_10_20: this.channels_10_20,
            channels: this.channels
        }
    }
}

module.exports.BrainWaveSensorSpec = BrainWaveSensorSpec;
