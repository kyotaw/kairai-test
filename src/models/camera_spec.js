'use strict';

class CameraSpec {

    constructor(params) {
        params = params || {};
        this.totalPixels = params.totalPixels || 0;
        this.effectivePixels = params.effectivePixels || 0;
        this.colorSpaces = params.colorSpaces || [];
    }

    toDict() {
        return {
            totalPixels: this.totalPixels,
            effectivePixels: this.effectivePixels,
            colorSpaces: this.colorSpaces,
        }
    }
}

module.exports.CameraSpec = CameraSpec;
