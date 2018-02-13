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
                latitude: this.latitude,
                longitude: this.longitude,
            },
            distance * 1000, // convert to m
            bearing);
        return new GeoLocation(dst.latitude, dst.longitude);
    }

    isPointInCircle(point, radius) {
        return geolib.isPointInCircle(point, this, radius * 1000);
    }

    toDict() {
        return {
            latitude: geolib.decimal2sexagesimal(this.latitude) + ' N',
            longitude: geolib.decimal2sexagesimal(this.longitude) + ' E'
        }
    }
}

module.exports.GeoLocation = GeoLocation;
