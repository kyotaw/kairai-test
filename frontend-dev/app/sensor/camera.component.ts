import { Component, OnInit, Input } from '@angular/core';

import { Camera } from '../models/camera.model';

@Component({
  selector: 'app-camera-spec',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

    @Input('sensor') camera: Camera;

    constructor() {}

    ngOnInit() {}

    get totalPixels() {
        if (!this.camera.spec.totalPixels) {
            return '-';
        } else {
            return this.camera.spec.totalPixels + ' Megapixels';
        }
    }

    get effectivePixels() {
        if (!this.camera.spec.effectivePixels) {
            return '-';
        } else {
            return this.camera.spec.effectivePixels + ' Megapixels';
        }
    }

    get colorSpaces() {
        if (this.camera.spec.colorSpaces.length === 0) {
            return '-';
        } else {
            return this.camera.spec.colorSpaces.reduce((prev, cur) => {
                return prev + ', ' + cur;
            });
        }
    }

}
