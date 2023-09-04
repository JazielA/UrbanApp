import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';

import { defineCustomElements } from '@teamhive/lottie-player/loader';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';





defineCustomElements(window);


// @NgModule({
//   declarations: [
//     // ... tus componentes y páginas aquí
//     [LandingPage]
//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agrega 'CUSTOM_ELEMENTS_SCHEMA' aquí
// })


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
  ],
  declarations: [LandingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LandingPageModule {}
