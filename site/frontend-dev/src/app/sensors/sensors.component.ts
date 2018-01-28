import { Component, OnInit } from '@angular/core';

import { Sensor } from '../models/sensor.model';
import { ProductId } from '../models/product-id.model';
import { SensorService } from '../services/sensor.service';

@Component({
  selector: 'app-root',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
    sensors: Sensor[];

    constructor(private sensorService: SensorService) {
    }

    ngOnInit() {
        this.sensorService.getSensors().subscribe(sensors => {
            this.sensors = sensors;
        });
    }

}
