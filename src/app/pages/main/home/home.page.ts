import { Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";
import { AddTripComponent } from "src/app/shared/components/add-trip/add-trip.component";
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from "src/environments/environment";
import { MapComponent } from "src/app/shared/components/map/map.component";
import { User } from "firebase/auth";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],


})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  ngOnInit() { }

  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  ionViewDidEnter() {
    this.createMap();

  }

  async createMap() {
    console.log("si pasa");

    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: -33.03360641459286,
          lng: -71.53317760013344,
        },
        zoom: 8,
      },
    });
  }



  // obtener datos del usuario desde el local storage
  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  // Agregar un viaje
  addTrip() {
    this.utilSvc.presentModal({
      component: AddTripComponent,
      cssClass: "add-trip-modal",
    });
  }

}
