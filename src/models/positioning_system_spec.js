'use strict';

const INVALID_MAX_ACCURACY = -1;

class PositioningSystemSpec {

    constructor(params) {
        params = params || {};
        this.methods = params.methods || [];
        this.maxAccuracy = params.maxAccuracy;
        if (this.maxAccuracy === undefined || this.maxAccuracy === INVALID_MAX_ACCURACY) {
            this.maxAccuracy = null;
        }
    }

    toDict() {
        return {
            methods: this.methods,
            maxAccuracy: this.maxAccuracy
        }
    }
}

module.exports.PositioningSystemSpec = PositioningSystemSpec;
