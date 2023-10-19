import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  // creacion del formulario
  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    
  })
  // inyeccion de servicios
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  imagePath: string = 'assets/icon/icono.png';

  ngOnInit() {
  }

  async submit(){
    if (this.form.value) {

      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {
        
        this.utilsSvc.presentToast({
          message: 'El correo ha sido enviado con éxito',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'

        })

        this.utilsSvc.routerLink('/auth');
        this.form.reset();

        
        
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
