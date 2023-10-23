import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { CustomInputComponent } from "./components/custom-input/custom-input.component";
import { LogoComponent } from "./components/logo/logo.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddTripComponent } from "./components/add-trip/add-trip.component";
import { GmapComponent } from "./components/gmap/gmap.component";
import { MapComponent } from "./components/map/map.component";

@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddTripComponent,
    GmapComponent,

  ],

  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    AddTripComponent,
    GmapComponent,

  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
