'use strict';

const geolib = require('geolib');

const INVALID_LAT = 181;
const INVALID_LNG = 91;

class GeoLocation {

    constructor(latitude, longitude) {
        this._latitude = (latitude === INVALID_LAT) ? null : latitude;
        this._longitude = (longitude === INVALID_LNG) ? null : longitude;
    }

    get latitude() {
        return this._latitude ? this._latitude : INVALID_LAT;
    }

    get longitude() {
        return this._longitude ? this._longitude : INVALID_LNG; 
    }

    calcDestinationLocation(distance, bearing) {
        const dst = geolib.computeDestinationPoint(
            {
                lat: this.latitude,
                lon: this.longitude
            },
            distance,
            bearing);
        return new GeoLocation(dst.latitude, dst.longitude);
    }

    isPointInCircle(point, radius) {
        return geolib.isPointInCircle(point, this, radius);
    }

    toDict {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        }
    }
}

module.exports.GeoLocation = GeoLocation;
