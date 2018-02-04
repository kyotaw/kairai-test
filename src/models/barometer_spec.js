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
            linearity: this.linearity || 0,
            hysteresis: this.hysteresis || 0,
            repeatability: this.repeatability || 0,
            calibrationUncertainty: this.calibrationUncertainty || 0,
            accuracy: this.accuracy || 0,
        }
    }
}

module.exports.BarometerSpec = BarometerSpec;
