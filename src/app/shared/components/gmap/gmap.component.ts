import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent {
  // @ViewChild('map') mapRef: ElementRef;
  // map: GoogleMap;

  // ionViewDidEnter() {
  //   console.log("si pasa");
  //   this.createMap();

  // }

  // async createMap() {
  //   console.log("si pasa");

  //   this.map = await GoogleMap.create({
  //     id: 'my-map',
  //     apiKey: environment.mapsKey,
  //     element: this.mapRef.nativeElement,
  //     config: {
  //       center: {
  //         lat: 33.6,
  //         lng: -117.9,
  //       },
  //       zoom: 8,
  //     },
  //   });
  // }

}
