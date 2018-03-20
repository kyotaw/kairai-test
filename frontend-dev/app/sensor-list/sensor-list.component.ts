import { Component, OnInit } from '@angular/core';

import { Sensor } from '../models/sensor.model';
import { Device } from '../models/device.model';
import { ProductId } from '../models/product-id.model';
import { SensorService } from '../services/sensor.service';
import { KairaiApiService } from '../services/kairai-api.service';
import { environment } from '../../environments/environment';

class SensorCategory {

    constructor(
        public readonly type: string,
        public readonly sensors: Sensor[]
    ) {}
}

@Component({
  selector: 'app-senser-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
    sensors: Sensor[];
    selectedSensors: Sensor[];
    devices: Device[];
    categories: SensorCategory[];

    constructor(private readonly sensorService: SensorService, private readonly api: KairaiApiService) {
        this.devices = [];
        this.sensors = [];
        this.selectedSensors = [];
        this.categories = [];
    }

    ngOnInit() {
        this.sensorService.getDevices().subscribe(devices => {
            this.devices = devices;
            this._buildNavi();
        });
    }

    get allSensorCount() {
        if (this.sensors) {
            return this.sensors.length;
        } else {
            return 0;
        }
    }

    get activeSensorCount() {
        if (this.sensors) {
            return this.sensors.filter(s => { return s.isActive; }).length;
        } else {
            return 0;
        }
    }

    get readySensorCount() {
        if (this.sensors) {
            return this.sensors.filter(s => { return s.isReady; }).length;
        } else {
            return 0;
        }
    }

    selectAll() {
        this.selectedSensors = this.sensors;
    }

    selectActiveSensors() {
        this.selectedSensors = this._getActiveSensors();
    }

    selectReadySensors() {
        this.selectedSensors = this._getReadySensors();
    }

    selectCategory(category: SensorCategory) {
        this.selectedSensors = category.sensors;
    }

    selectDevice(device: Device) {
        this.selectedSensors = device.sensors;
    }

    _buildNavi() {
        for (let device of this.devices) {
            this.sensors = this.sensors.concat(device.sensors);
        }
        this.selectedSensors = this.sensors;

        let categories = {};
        for (let sensor of this.sensors) {
            if (!categories[sensor.type]) {
                categories[sensor.type] = [];
            }
            categories[sensor.type].push(sensor);
        }
        for (let type in categories) {
            const cat = new SensorCategory(type, categories[type]);
            this.categories.push(cat);
        }
    }

    _getActiveSensors() {
        return this.sensors.filter(s => { return s.isActive; });
    }

    _getReadySensors() {
        return this.sensors.filter(s => { return s.isReady; });
    }
}
