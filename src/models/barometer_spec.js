'use strict';

const ERROR = 0.000001;

class BarometerSpec {

    constructor(params) {
        params = params || {};
        this.linearity = params.linearity || 0;
        if (Math.abs(this.linearity) < ERROR) {
            this.linearity = null;
        }
        this.hysteresis = params.hysteresis || 0;
        if (Math.abs(this.hysteresis) < ERROR) {
            this.hysteresis = null;
        }
        this.repeatability = params.repeatability || 0;
        if (Math.abs(this.repeatability) < ERROR) {
            this.repeatability = null;
        }
        this.calibrationUncertainty = params.calibrationUncertainty || 0;
        if (Math.abs(this.calibrationUncertainty) < ERROR) {
            this.calibrationUncertainty = null;
        }
        this.accuracy = params.accuracy || 0;
        if (Math.abs(this.accuracy) < ERROR) {
            this.accuracy = null;
        }
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
