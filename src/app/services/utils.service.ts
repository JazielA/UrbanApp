import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  // Pantalla de carga
  loading() {
    return this.loadingCtrl.create({ spinner: "lines-sharp" });
  }

  // Toast de usuario invalido

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // Enrutador de paginas
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // Guardar en el local storage
  saveInLocalStorage(key: string, value: any) {
    // con JSON.stringify(value) formatea los JSON en string
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // obtener un elemento desde el localstorage
  getFromLocalStorage(key: string) {
    // Con JSON.parse(localStorage.getItem(key)) formatea el string en formato JSON
    return JSON.parse(localStorage.getItem(key));
  }
}
