import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { KairaiApiService } from './services/kairai-api.service';
import { SensorService } from './services/sensor.service';
import { ChannelService } from './services/channel.service';
import { UserService } from './services/user.service';

import { JwtIterceptor } from './interceptors/jwt.interceptor';
import { CanActivateViaAuthGuardInterceptor } from './interceptors/can-activate-via-auth-guard.interceptor';

import { AppComponent } from './app.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SensorComponent } from './sensor/sensor.component';
import { AccelerometerComponent } from './sensor/accelerometer.component';
import { CameraComponent } from './sensor/camera.component';
import { BarometerComponent } from './sensor/barometer.component';
import { PositioningSystemComponent } from './sensor/positioning-system.component';
import { BrainwaveSensorComponent } from './sensor/brainwave-sensor.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@NgModule({
    declarations: [
        AppComponent,
        SensorListComponent,
        SensorComponent,
        AccelerometerComponent,
        CameraComponent,
        BarometerComponent,
        PositioningSystemComponent,
        BrainwaveSensorComponent,
        LoginComponent,
        SignupComponent,
        MainToolbarComponent,
        ProfileComponent,
        ChangePasswordComponent,
        DeleteAccountComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule,
        MatGridListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule, 
        ClipboardModule,
        AppRoutingModule,
  ],
  exports: [
  ],
  providers: [
      SensorService,
      KairaiApiService,
      ChannelService,
      UserService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtIterceptor,
        multi: true
      },
      CanActivateViaAuthGuardInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
