import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalPage } from 'src/app/pages/main/modal/modal.page';
import { UtilsService } from 'src/app/services/utils.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent {

  utilSvc = inject(UtilsService);

  @Input() position = {
    lat: -33.03360641459286,
    lng: -71.53317760013344
  }

  marker: any;
  infoWindow: any;


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

    this.infoWindow = new google.maps.InfoWindow();
    // this.addMarkers();
  }


  // agregar marcadores
  async addMarkers(position) {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: position.lat,
          lng: position.lng,
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
    await this.map.addMarkers(markers);

    // centrar la posicion del mapa en la ubicacion del dispositivo
    this.map.setCamera({
      coordinate: {
        lat: position.lat,
        lng: position.lng,
      },
      zoom: 17
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
  }


  async test2() {
    console.log('Current position:');
    Geolocation.getCurrentPosition().then((res) => {
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      console.log('Current position:', position);
      this.addMarkers(position);
    });
  }



}
