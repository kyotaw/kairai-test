import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Sensor } from '../models/sensor.model';
import { Channel } from '../models/channel.model';
import { KairaiApiService } from './kairai-api.service';
import { ChannelFactory } from '../models/channel-factory.model';

@Injectable()
export class ChannelService {

    constructor(private kairaiApi: KairaiApiService) {}

    getChannel(host: Sensor): Observable<Channel> {
        return this.kairaiApi.getChannel(host.productId.hash).map(json => {
            return ChannelFactory.create(json['data']);
        });
    }
}
