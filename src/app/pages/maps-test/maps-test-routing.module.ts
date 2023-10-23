import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsTestPage } from './maps-test.page';

const routes: Routes = [
  {
    path: '',
    component: MapsTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsTestPageRoutingModule {}
