import { Component, OnInit, Input } from '@angular/core';

import { Barometer } from '../models/barometer.model';

@Component({
  selector: 'app-barometer-spec',
  templateUrl: './barometer.component.html',
  styleUrls: ['./barometer.component.css']
})
export class BarometerComponent implements OnInit {
    
    @Input('sensor') barometer: Barometer;

    constructor() {}

    ngOnInit() {}

    get linearity() {
        if (!this.barometer.spec.linearity) {
            return '-';
        } else {
            return `±${this.barometer.spec.linearity}hPa`;
        }
    }

    get hysteresis() {
        if (!this.barometer.spec.hysteresis) {
            return '-';
        } else {
            return `±${this.barometer.spec.hysteresis}hPa`;
        }
    }

    get repeatability() {
        if (!this.barometer.spec.repeatability) {
            return '-';
        } else {
            return `±${this.barometer.spec.repeatability}hPa`;
        }
    }

    get calibrationUncertainty() {
        if (!this.barometer.spec.calibrationUncertainty) {
            return '-';
        } else {
            return `±${this.barometer.spec.calibrationUncertainty}hPa`;
        }
    }

    get accuracy() {
        if (!this.barometer.spec.accuracy) {
            return '-';
        } else {
            return `±${this.barometer.spec.accuracy}hPa`;
        }
    }
}
