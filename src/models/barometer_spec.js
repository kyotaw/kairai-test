'use strict';

const ERROR = 0.000001;
const INVALID_VALUE = -1;

class BarometerSpec {

    constructor(params) {
        params = params || {};
        this.linearity = params.linearity || null;
        this.hysteresis = params.hysteresis || null;
        this.repeatability = params.repeatability || null;
        this.calibrationUncertainty = params.calibrationUncertainty || null;
        this.accuracy = params.accuracy || null;
    }

    toDict() {
        return {
            linearity: this.linearity,
            hysteresis: this.hysteresis,
            repeatability: this.repeatability,
            calibrationUncertainty: this.calibrationUncertainty,
            accuracy: this.accuracy,
        }
    }
}

module.exports.BarometerSpec = BarometerSpec;
