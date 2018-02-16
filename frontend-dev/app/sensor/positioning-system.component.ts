import { Component, OnInit, Input } from '@angular/core';

import { PositioningSystem } from '../models/positioning-system.model';

@Component({
  selector: 'app-positioning-system-spec',
  templateUrl: './positioning-system.component.html',
  styleUrls: ['./positioning-system.component.css']
})
export class PositioningSystemComponent implements OnInit {
    
    @Input('sensor') positioningSystem: PositioningSystem;

    constructor() {}

    ngOnInit() {}

    get methods() {
        if (this.positioningSystem.spec.methods.length === 0) {
            return '-';
        } else {
            return this.positioningSystem.spec.methods.map(m => {
                if (m === 'gps') {
                    return 'GPS';
                } else if (m === 'wifi') {
                    return 'Wi-Fi';
                } else {
                    return m;
                }
            }).reduce((prev, cur) => {
                return prev + ', ' + cur;
            });
        }
    }

    get maxAccuracy() {
        if (!this.positioningSystem.spec.maxAccuracy) {
            return '-';
        } else {
            return this.positioningSystem.spec.maxAccuracy + ' m';
        }
    }
}
