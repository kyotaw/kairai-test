import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SensorListComponent } from './sensor-list/sensor-list.component';

const routes: Routes = [
  { path: 'sensors', component: SensorListComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
