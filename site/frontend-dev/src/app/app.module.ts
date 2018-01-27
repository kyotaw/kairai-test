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

import { ClipboardModule } from 'ngx-clipboard';

import { SensorsComponent } from '../sensors/sensors.component';

@NgModule({
  declarations: [
    SensorsComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatDividerModule, MatTooltipModule, MatGridListModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [SensorsComponent]
})
export class AppModule { }
