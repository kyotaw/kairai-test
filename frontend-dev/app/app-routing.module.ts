import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SensorListComponent } from './sensor-list/sensor-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { CanActivateViaAuthGuardInterceptor } from './interceptors/can-activate-via-auth-guard.interceptor';

const routes: Routes = [
    { path: 'sensors', component: SensorListComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
