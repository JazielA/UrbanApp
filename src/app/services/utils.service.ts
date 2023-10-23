import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  AlertOptions,
  LoadingController,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from "@ionic/angular";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  alertaCtrl = inject(AlertController)

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: "Selecciona una imagen",
      promptLabelPicture: "Toma una foto",
    });
  };

  // Alerta
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertaCtrl.create(opts);
    await alert.present();
  }

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

  // creacion de Modal

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    // aqui obtenemos la data del modal cuando se cierra
    const { data } = await modal.onWillDismiss();
    // si existe data esta se retornará
    if (data) return data;
  }

  // cerra el modal
  // 
  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }
}
