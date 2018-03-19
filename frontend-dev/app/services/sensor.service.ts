import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { KairaiApiService} from './kairai-api.service';
import { Sensor } from '../models/sensor.model';
import { Device } from '../models/device.model';
import { SensorFactory } from '../models/sensor-factory.model';
import { DeviceFactory } from '../models/device-factory.model';
import { ProductId } from '../models/product-id.model';

@Injectable()
export class SensorService {

    constructor(private karaiApi: KairaiApiService) {}

    getSensors(): Observable<Sensor[]> {
        return this.karaiApi.getDataSources().map(json => {
            let sensors: Sensor[] = [];
                for (let data of json['data']) {
                    const sensor = SensorFactory.create(data);
                    if (sensor) {
                        sensors.push(sensor);
                    }
                }
            return sensors;
        });
    }

    getDevices(): Observable<Device[]> {
        return this.karaiApi.getMonos().map(json => {
            let devices: Device[] = [];
            for (let data of json['data']) {
                const device = DeviceFactory.create(data);
                if (device) {
                    devices.push(device);
                }
            }
            return devices;
        });
    }

}
