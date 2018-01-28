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
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { HttpClientModule } from '@angular/common/http';

import { ClipboardModule } from 'ngx-clipboard';

import { SensorsComponent } from './sensors/sensors.component';
import { KairaiApiService } from './services/kairai-api.service';
import { SensorService } from './services/sensor.service';

@NgModule({
  declarations: [
    SensorsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatDividerModule, MatTooltipModule, MatGridListModule,
    FlexLayoutModule,
    HttpClientModule,
    ClipboardModule,
  ],
  exports: [
  ],
  providers: [
      SensorService,
      KairaiApiService
  ],
  bootstrap: [SensorsComponent]
})
export class AppModule { }
