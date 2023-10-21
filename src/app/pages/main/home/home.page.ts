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
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  ngOnInit() { }

  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }


  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }




  // Agregar un viaje
  addTrip() {
    this.utilSvc.presentModal({
      component: AddTripComponent,
      cssClass: "add-trip-modal",
    });
  }





}
