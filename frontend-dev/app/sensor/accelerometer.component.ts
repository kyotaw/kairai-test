import { Component, OnInit, Input } from '@angular/core';

import { Accelerometer } from '../models/accelerometer.model';

@Component({
  selector: 'app-accelerometer-spec',
  templateUrl: './accelerometer.component.html',
  styleUrls: ['./accelerometer.component.css']
})
export class AccelerometerComponent implements OnInit {
    
    @Input('sensor') accelerometer: Accelerometer;

    constructor() {}

    ngOnInit() {}

    get axis() {
        const axis = this.accelerometer.spec.axis;
        return axis === 0 ? '-' : axis;
    }

    get gRanges() {
        const gRanges = this.accelerometer.spec.gRanges;
        if (gRanges.length === 0) {
            return '-';
        } else {
            return gRanges.map(r => '±' + r + 'g').reduce((prev, cur) => prev + ', ' + cur);
        }
    }

    get sensitivities() {
        const sensitivities = this.accelerometer.spec.sensitivities;
        if (sensitivities.length === 0) {
            return '-';
        } else {
            return sensitivities.map(s => s.toString()).reduce((prev, cur) => prev + ', ' + cur);
        }
    }

    get noiseRange() {
        const noiseRange = this.accelerometer.spec.noiseRange;
        if (noiseRange.length === 0) {
            return '-';
        } else {
            return noiseRange[0] + ' -  ' + noiseRange[1];
        }
    }

    get resolutions() {
        const resolutions = this.accelerometer.spec.resolutions;
        if (resolutions.length === 0) {
            return '-';
        } else {
            return resolutions.map(r => r + '-bit').reduce((prev, cur) => prev + ', ' + cur);
        }
    }
}
