import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() { }


  async test2() {
    Geolocation.getCurrentPosition().then((res) => {
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      return position
    });

  }
}
