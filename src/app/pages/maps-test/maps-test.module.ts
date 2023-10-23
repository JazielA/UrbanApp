import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsTestPageRoutingModule } from './maps-test-routing.module';

import { MapsTestPage } from './maps-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsTestPageRoutingModule
  ],
  declarations: [MapsTestPage]
})
export class MapsTestPageModule {}
