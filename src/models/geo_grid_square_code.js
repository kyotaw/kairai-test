'use strict';

class GridSquareCode {
    
    constructor(location) {
        this.location = location;
        this.firstGridCode = []; // lat, lng
        this.secondGridCode = []; // lat, lng
        this.thirdGridCode = []; // lat, lng
    }

    _calcGridCode() {
        // first grid
        const lat = this.location.latitude * 60.0; // convert to minutes 
        const lng = this.location.longitude - 100.0;
        this.firstGridCode = [
            this._padStart(Math.floor(lat / 40.0), 2),
            this._digit(Math.floor(lng - 100.0), 2)
        ]

        // second grid
        const lat2 = lat % 40.0;
        const lng2 = lng % lng * 60.0; // convert to minutes
        this.secondGridCode = [
            this._padStart(Math.floor(lat2 / 5.0), 1),
            this._padStart(Math.floor(lng2 * 7.5), 1)
        ]

        // third grid
        const lat3 = lat2 % 5.0 * 60.0 // convert to seconds
        const lng3 = lng2 % 7.5 * 60.0 // convert to seconds
        this.thirdGridCode = [
            this._padStart(Math.floor(lat3 / 30.0), 1),
            this._padStart(Math.floor((lng3 / 45.0), 1)
        ]
    }

    _padStart(num, digit) {
        const str = num.toString().split('.')[0].slice(0, digit);
        const pad = digit - str.length;
        return '0'.repeat(pad > 0 ? pad : 0) + str;
    }

}
