import { Component, Input, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";


import { Address } from "src/app/models/address.model";
import { User } from "src/app/models/user.model";

import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-add-trip",
  templateUrl: "./add-trip.component.html",
  styleUrls: ["./add-trip.component.scss"],
})
export class AddTripComponent implements OnInit {

  @Input() address: Address

  direccionVar = "";



  direcciones: any[] = [
    { id: 1, direccion: "duoc viña" },
    { id: 2, direccion: "duoc valpo" },
    { id: 3, direccion: "duoc quillota" }
  ]

  // creacion del formulario
  form = new FormGroup({
    id: new FormControl(""),
    // image: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    lat: new FormControl(null, [Validators.required]),
    lng: new FormControl(null, [Validators.required])
  });
  // inyeccion de servicios
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user = {} as User;

  imagePath: string = "assets/icon/icono.png";

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user')
    if (this.address) this.form.setValue(this.address)
  }

  // tomar/seleccionar una imagen
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture("Imagen ")).dataUrl;
    // this.form.controls.image.setValue(dataUrl);
  }

  submit() {
    if (this.form.valid) {
      if (this.address) this.updateAddress();
      else this.createAddress()
    }
  }



  // crear direccion
  async createAddress() {


    let path = `users/${this.user.uid}/direcciones`
    const loading = await this.utilsSvc.loading();
    await loading.present();

    delete this.form.value.id;
    this.firebaseSvc.addDocument(path, this.form.value).then(async (res) => {


      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: "Direccion guardad exitosamente",
        duration: 1500,
        color: "primary",
        position: "middle",
        icon: "checkmark-circle-outline",
      });


    }).catch((error) => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error,
        duration: 2500,
        color: "dark",
        position: "middle",
        icon: "alert-circle-outline",
      });
    })
      .finally(() => {
        loading.dismiss();
      });

  }


  // Actualizar direccion
  async updateAddress() {


    let path = `users/${this.user.uid}/direcciones/${this.address.id}`
    const loading = await this.utilsSvc.loading();
    await loading.present();

    delete this.form.value.id;
    this.firebaseSvc.updateDocument(path, this.form.value).then(async (res) => {


      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: "Direccion actualizada exitosamente",
        duration: 1500,
        color: "primary",
        position: "middle",
        icon: "checkmark-circle-outline",
      });


    }).catch((error) => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error,
        duration: 2500,
        color: "dark",
        position: "middle",
        icon: "alert-circle-outline",
      });
    })
      .finally(() => {
        loading.dismiss();
      });
  }

}
