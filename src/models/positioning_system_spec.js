'use strict';

class PositioningSystemSpec {

    constructor(params) {
        params = params || {};
        this.methods = params.methods || [];
        this.maxAccuracy = params.maxAccuracy;
        if (this.maxAccuracy === undefined || this.maxAccuracy < 0) {
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
