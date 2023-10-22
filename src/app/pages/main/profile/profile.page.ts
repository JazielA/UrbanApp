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

  ngOnInit() {}

  user(): User {
    return this.utilsSvc.getFromLocalStorage("user");
  }

  // tomar/seleccionar una imagen
  async takeImage() {
    let user = this.user();
    let path = `users/${user.uid}`;

    const dataUrl = (await this.utilsSvc.takePicture("Imagen de Perfil"))
      .dataUrl;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = `${user.uid}/profile`;
    user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

    this.utilsSvc.saveInLocalStorage("user", user);

    

    this.utilsSvc.presentToast({
      message: "Imagen guardada correctamente",
      duration: 2500,
      color: "dark",
      position: "middle",
      icon: "alert-circle-outline",
    });
  }
}
