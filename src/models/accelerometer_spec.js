'use strict';

class AccelerometerSpec {

    constructor(params) {
        params = params || {};
        this.axis = params.axis || 0;
        this.gRanges = params.gRanges || [];
        this.sensitivities = params.sensitivities || [];
        this.noiseRange = params.noiseRange || [];
        this.resolutions = params.resolutions || [];
    }

    toDict() {
        return {
            axis: this.axis,
            gRanges: this.gRanges,
            sensitivities: this.sensitivities,
            noiseRange: this.noiseRange,
            resolutions: this.resolutions,
        }
    }
}

module.exports.AccelerometerSpec = AccelerometerSpec;
