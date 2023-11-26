import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ClimaService } from 'src/app/services/clima.service';
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],

})
export class MainPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  clima = inject(ClimaService);

  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline' },
    { title: 'Direcciones', url: '/main/address', icon: 'navigate-circle-outline' }
  ]

  router = inject(Router);
  currentPath: string = '';

  weatherData: any;

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    })
  }

  ngAfterViewInit() {
    this.getClima();
  }


  async getClima() {

    Geolocation.getCurrentPosition().then((res) => {
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      // console.log('Current position:', position);
      this.clima.getWeather2(position.lat, position.lng)
        .subscribe(data => {
          this.weatherData = data
          console.log(data);
        })

    });










  }


  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  // Cerrar sesion
  signOut() {
    this.firebaseSvc.signOut();
  }

}
