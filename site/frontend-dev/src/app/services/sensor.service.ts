import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { KairaiApiService} from './kairai-api.service';
import { Sensor } from '../models/sensor.model';
import { SensorFactory } from '../models/sensor.factory';
import { ProductId } from '../models/product-id.model';

@Injectable()
export class SensorService {

    constructor(private karaiApi: KairaiApiService) {}

    getSensors(): Observable<Sensor[]> {
        return this.karaiApi.getDataSources().map(json => {
            let sensors: Sensor[] = [];
            for (let data of json['data']) {
                const sensor = SensorFactory.create(data);
                sensors.push(sensor);
            }
            return sensors;
        });
    }

}
