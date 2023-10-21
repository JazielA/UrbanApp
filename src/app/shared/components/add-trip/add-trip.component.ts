import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";

import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-add-trip",
  templateUrl: "./add-trip.component.html",
  styleUrls: ["./add-trip.component.scss"],
})
export class AddTripComponent implements OnInit {
  // creacion del formulario
  form = new FormGroup({
    id: new FormControl(""),
    image: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    lat: new FormControl("", [Validators.required]),
  });
  // inyeccion de servicios
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  imagePath: string = "assets/icon/icono.png";

  ngOnInit() {}

  // tomar/seleccionar una imagen
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture("Imagen ")).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc
        .signUp(this.form.value as User)
        .then(async (res) => {
          await this.firebaseSvc.updateUser(this.form.value.name);

          let uid = res.user.uid;
        })
        .catch((error) => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: "Las credenciales no son correctas",
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
}
