import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // creacion del formulario
  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })
  // inyeccion de servicios
  firebaseSvg = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  imagePath: string = 'assets/icon/icono.png';

  ngOnInit() {
  }

  async submit(){
    if (this.form.value) {

      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvg.signIn(this.form.value as User).then(res => {
        console.log(res);
        
      }).catch(error =>{
        console.log(error);
        this.utilsSvc.presentToast({
          message: 'Las credenciales no son correctas',
          duration: 2500,
          color: 'dark',
          position: 'middle',
          icon: 'alert-circle-outline'

        })
        
      }).finally(()=>{
        loading.dismiss();
      })
    }
  }



}
