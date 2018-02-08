'use strict';

class CameraSpec {

    constructor(params) {
        params = params || {};
        this.totalPixels = params.totalPixels || null;
        this.effectivePixels = params.effectivePixels || null;
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
