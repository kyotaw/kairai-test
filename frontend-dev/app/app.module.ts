import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { HttpClientModule } from '@angular/common/http';

import { ClipboardModule } from 'ngx-clipboard';

import { SensorListComponent } from './sensor-list/sensor-list.component';
import { KairaiApiService } from './services/kairai-api.service';
import { SensorService } from './services/sensor.service';
import { ChannelService } from './services/channel.service';

import { SensorComponent } from './sensor/sensor.component';
import { AccelerometerComponent } from './sensor/accelerometer.component';
import { CameraComponent } from './sensor/camera.component';
import { BarometerComponent } from './sensor/barometer.component';
import { PositioningSystemComponent } from './sensor/positioning-system.component';

@NgModule({
  declarations: [
    SensorListComponent,
    SensorComponent,
    AccelerometerComponent,
    CameraComponent,
    BarometerComponent,
    PositioningSystemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    ClipboardModule,
  ],
  exports: [
  ],
  providers: [
      SensorService,
      KairaiApiService,
      ChannelService,
  ],
  bootstrap: [SensorListComponent]
})
export class AppModule { }
