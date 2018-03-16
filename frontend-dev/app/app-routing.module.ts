import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SensorListComponent } from './sensor-list/sensor-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'sensors', component: SensorListComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
