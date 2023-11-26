import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";

import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  imagePath: string = "assets/icon/icono.png";

  ngOnInit() { }


  pError() {
    this.utilsSvc.routerLink("/404");
  }

  // fn que trae los datos del usuario desde el local storage
  user(): User {
    return this.utilsSvc.getFromLocalStorage("user");
  }

  // tomar/seleccionar una imagen
  async takeImage() {
    // variable que captura los datos del usuaio

    let user = this.user();
    let path = `users/${user.uid}`;

    const dataUrl = (await this.utilsSvc.takePicture("Imagen de Perfil")).dataUrl;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = `${user.uid}/profile`;
    user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

    this.firebaseSvc.updateDocument(path, { image: user.image }).then(async res => {


      this.utilsSvc.saveInLocalStorage("user", user);

      this.utilsSvc.presentToast({
        message: "Imagen guardada correctamente",
        duration: 2500,
        color: "dark",
        position: "middle",
        icon: "alert-circle-outline",
      });
      loading.dismiss();

    }).catch(error => {
      console.log(error);
      const loading = this.utilsSvc.loading();

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: "dark",
        position: "middle",
        icon: "alert-circle-outline",
      });


    }).finally(() => {
      loading.dismiss();
    })

  }

}


