import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Sensor } from '../models/sensor.model';
import { SensorType } from '../models/sensor-types.model';
import { SensorStatus } from '../models/sensor-status.model';
import { Accelerometer } from '../models/accelerometer.model';
import { Camera } from '../models/camera.model';
import { Barometer } from '../models/barometer.model';
import { PositioningSystem } from '../models/positioning-system.model';
import { ChannelService } from '../services/channel.service';
import { Channel } from '../models/channel.model';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
    @Input() sensor: Sensor;
    channel: Channel;
    isOverview = true;
    
    constructor(private readonly channelService: ChannelService) {}

    ngOnInit() {
        /*
        Observable.interval(5000)
            .subscribe(() => this.channelService.getChannel(this.sensor).subscribe(channel => {
                this.channel = channel;
                this.sensor.status = channel.status;
            }));
        */
        this.channelService.getChannel(this.sensor).subscribe(channel => {
            this.channel = channel;
            this.sensor.status = channel.status;
        });
    }

    get sensorName() {
        return this.sensor.name;
    }

    get sensorType() {
        return this.sensor.type;
    }

    get sensorStatus() {
        if (!this.channel) {
            return '-';
        }
        if (this.channel.status === SensorStatus.active) {
            return this.channel.status + ` (${this.channel.listeners.length} listeners)`;
        } else {
            return this.channel.status;
        }
    }

    get location() {
        if (!this.sensor.location) {
            return '-';
        }
        const lat = this.sensor.location.latitude;//Math.floor(this.sensor.location.latitude * 100) / 100;
        const lng = this.sensor.location.longitude;//Math.floor(this.sensor.location.longitude * 100) / 100;
        return `${lat}, ${lng}`;
    }

    showDetail() {
        this.isOverview = false;
    }
    
    showOverview() {
        this.isOverview = true;
    }

    isAccelerometer(sensor: any): sensor is Accelerometer {
        return sensor.type === SensorType.accelerometer;
    }

    isCamera(sensor: any): sensor is Camera {
        return sensor.type === SensorType.camera;
    }
    
    isBarometer(sensor: any): sensor is Barometer {
        return sensor.type === SensorType.barometer;
    }

    isPositioningSystem(sensor: any): sensor is PositioningSystem {
        return sensor.type === SensorType.positioningSystem;
    }
}
