'use strict';

const geolib = require('geolib');

const INVALID_LAT = 181;
const INVALID_LNG = 91;

class GeoLocation {

    constructor(latitude, longitude) {
        this.latitude = (latitude === INVALID_LAT) ? null : latitude;
        this.longitude = (longitude === INVALID_LNG) ? null : longitude;
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

    toDict() {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        }
    }
}

module.exports.GeoLocation = GeoLocation;
