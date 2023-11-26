import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import emailjs from '@emailjs/browser';
import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  // creacion del formulario
  form = new FormGroup({
    uid: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
  });
  // inyeccion de servicios
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  imagePath: string = "assets/icon/icono.png";

  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc
        .signUp(this.form.value as User)
        .then(async (res) => {
          await this.firebaseSvc.updateUser(this.form.value.name);
          let uid = res.user.uid;
          this.form.controls.uid.setValue(uid);
          this.setUserInfo(uid);
          console.log(this.form.value.email);

          this.send();

          // let rest = await emailjs.send("service_i4nsv23", "template_8tlhmko", {
          //   from_name: "Urban App",
          //   to_name: "Jaziel",
          //   from_email: "urbanapp00@gmail.com",
          //   message: "Bienvenido a Urban App.",
          //   to: "jaziel.aguilera.gonzalez@gmail.com",
          // });

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

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      delete this.form.value.password;
      this.firebaseSvc.setDocument(path, this.form.value).then(async (res) => {
        this.utilsSvc.saveInLocalStorage("user", this.form.value);
        this.utilsSvc.routerLink("/main/home");
        this.form.reset();
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



  async send() {
    emailjs.init('dVuX0sHuku6fcOUTJ')

    let msg = "¡Bienvenido a Urban App!"
    let sbj = "Te damos la Bienvenida."

    let rest = await emailjs.send("service_i4nsv23", "template_8tlhmko", {
      from_name: "Urban App",
      to_name: this.form.value.name,
      from_email: "urbanapp00@gmail.com",
      message: msg,
      to: this.form.value.email,
      from_subject: sbj,
    });

    // alert('message has been sent')
  }


}
