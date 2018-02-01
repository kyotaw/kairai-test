'use strict';

class AccelerometerSpec {

    constructor(params) {
        this.axis = params.axis || 0;
        this.gRanges = params.gRanges || [];
        this.sensitivities = params.sensitivities || [];
        this.noiseRange = params.noiseRange || [];
        this.resolutions = params.resolutions || [];
    }
}

module.exports.AccelerometerSpec = AccelerometerSpec;
