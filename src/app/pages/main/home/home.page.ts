import { Component, ElementRef, Input, OnInit, ViewChild, inject } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";
import { AddTripComponent } from "src/app/shared/components/add-trip/add-trip.component";
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from "src/environments/environment";
import { MapComponent } from "src/app/shared/components/map/map.component";
import { User } from "firebase/auth";

import { Geolocation } from '@capacitor/geolocation';
import { ModalPage } from "../modal/modal.page";
import { CapacitorGoogleMaps } from "@capacitor/google-maps/dist/typings/implementation";
import { error } from "console";


@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],

})

export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);


  @Input() position = {
    lat: -33.03360641459286,
    lng: -71.53317760013344
  }

  label = {
    titulo: 'Ubicacion',
    subtitulo: 'Mi ubicacion actual'
  }

  marker: any;
  infoWindow: any;


  ngOnInit() { }

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


  // Cargar mapa

  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  ngAfterViewInit() {
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
          lat: this.position.lat,
          lng: this.position.lng,
        },
        zoom: 12,
        disableDefaultUI: true,
        clickableIcons: false,
      },
    });


    this.map.enableClustering();



    this.infoWindow = new google.maps.InfoWindow();
    // this.addMarkers();


  }





  // geolocalizacion
  async test() {

    Geolocation.requestPermissions().then(async permission => {
      const coordinates = await Geolocation.getCurrentPosition();

      console.log(coordinates);

    })
  }


  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(position);
      this.addMarkers();
    });


  }

  async test2() {

    console.log('Current position:');
    Geolocation.getCurrentPosition().then((res) => {
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      console.log('Current position:', position);
      this.addMarkers();
    });
  }


  // agregar marcadores
  async addMarkers() {


    const wait = Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(position);





      const markers: Marker[] = [
        {
          coordinate: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          title: 'Mi ubicacion actual',
          snippet: 'position',
          draggable: true,
          iconUrl: "assets/icon/bus2.png",
          iconSize: {
            width: 50,
            height: 50,
          },
        },
      ];


      this.map.addMarkers(markers);
      const result = this.map.addMarkers(markers);

      // centrar la posicion del mapa en la ubicacion del dispositivo
      this.map.setCamera({
        coordinate: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      })
      // informacion sobre marcador
      this.map.setOnMarkerClickListener(async (marker) => {
        console.log(marker);

        const modal = await this.utilSvc.modalCtrl.create({
          component: ModalPage,
          componentProps: {
            marker,
          },
          breakpoints: [0, 0.3],
          initialBreakpoint: 0.3,
        });
        modal.present();
      })


    });
  }
}






