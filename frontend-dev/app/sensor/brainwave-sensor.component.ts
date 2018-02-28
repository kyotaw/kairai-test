import { Component, OnInit, Input } from '@angular/core';

import { BrainWaveSensor } from '../models/brainwave-sensor.model';

@Component({
  selector: 'app-brainwave-sensor-spec',
  templateUrl: './brainwave-sensor.component.html',
  styleUrls: ['./brainwave-sensor.component.css']
})
export class BrainwaveSensorComponent implements OnInit {
    
    @Input('sensor') brainwaveSensor: BrainWaveSensor;

    constructor() {}

    ngOnInit() {}

    get channels_10_20() {
        if (this.brainwaveSensor.spec.channels_10_20.length === 0) {
            return '-';
        } else {
            return this.brainwaveSensor.spec.channels_10_20.reduce((prev, cur) => {
                return prev + ', ' + cur;
            });
        }
    }

    get channels() {
        if (this.brainwaveSensor.spec.channels === 0) {
            return '-';
        } else {
            return this.brainwaveSensor.spec.channels;
        }
    }
}
