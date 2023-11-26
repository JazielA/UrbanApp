import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GeoService } from './geo.service';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  apiKey = 'df8323ce37bea8353d6c7fd24b2990a1'

  constructor(private http: HttpClient) { }

  // http = inject(HttpClient)
  // geo = inject(GeoService)



  // funcion con coordenadas
  getWeather2(lat: number, lng: number) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=df8323ce37bea8353d6c7fd24b2990a1')
  }

  getWeather(city: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=df8323ce37bea8353d6c7fd24b2990a1')
  }



}
