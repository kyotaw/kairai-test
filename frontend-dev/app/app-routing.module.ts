import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SignupComponent } from './signup/signup.component';

import { CanActivateViaAuthGuardInterceptor } from './interceptors/can-activate-via-auth-guard.interceptor';

const routes: Routes = [
    { path: 'sensors', component: SensorListComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'profile', component: ProfileComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'profile/changepassword', component: ChangePasswordComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'profile/deleteaccount', component: DeleteAccountComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
