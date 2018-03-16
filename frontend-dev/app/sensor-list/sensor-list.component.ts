import { Component, OnInit } from '@angular/core';

import { Sensor } from '../models/sensor.model';
import { ProductId } from '../models/product-id.model';
import { SensorService } from '../services/sensor.service';
import { KairaiApiService } from '../services/kairai-api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-senser-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
    sensors: Sensor[];
    isDetail = false;

    constructor(private readonly sensorService: SensorService, private readonly api: KairaiApiService) {
    }

    ngOnInit() {
        this.sensorService.getSensors().subscribe(sensors => {
            this.sensors = sensors;
        });
    }

    get activeSensors() {
        return this.sensors.filter(s => { return s.isActive; }).length;
    }

    get readySensors() {
        return this.sensors.filter(s => { return s.isReady; }).length;
    }

    get environment() {
        return environment.environment;
    }

    login() {
        this.api.socialLogin('google').subscribe(sensors => {
            console.log(sensors);
        });
    }
}
