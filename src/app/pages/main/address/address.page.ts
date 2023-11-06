import { Component, OnInit, inject } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddTripComponent } from 'src/app/shared/components/add-trip/add-trip.component';


@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);


  address: Address[] = [];
  loading: boolean = false;

  ngOnInit() {
  }

  user(): User {
    return this.utilSvc.getFromLocalStorage('user')
  }
  // el ionViewWillEnter ejecuta una funcion cada vez que el usuario ingresa a la pagina
  ionViewWillEnter() {
    this.getAdress();
  }

  // funcion de refresh en caso de caida de red de la pagina 
  doRefresh(event) {
    setTimeout(() => {
      this.getAdress
      event.target.complete();
    }, 1000);
  }

  // obtener direcciones
  getAdress() {
    let path = `users/${this.user().uid}/direcciones`
    this.loading = true;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.address = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })
  }


  // Agregar o actualizar una direccion
  async addUpdateAddress(address?: Address) {

    let success = await this.utilSvc.presentModal({
      component: AddTripComponent,
      cssClass: 'add-update-modal',
      componentProps: { address }
    })
    if (success) this.getAdress();
  }

  // Condirmacion de eliminacion de la direccion
  async confirmDeleteAddress(address: Address) {
    this.utilSvc.presentAlert({
      header: 'Eliminar Direccion!',
      message: '¿Desea eliminar esta direccion de forma permanente?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteAddress(address)
          }
        }
      ]
    });


  }



  // Eliminar direccion
  async deleteAddress(address: Address) {


    let path = `users/${this.user().uid}/direcciones/${address.id}`
    const loading = await this.utilSvc.loading();
    await loading.present();


    this.firebaseSvc.deleteDocument(path).then(async (res) => {

      this.address = this.address.filter(a => a.id !== address.id)
      this.utilSvc.presentToast({
        message: "Direccion eliminada exitosamente",
        duration: 1500,
        color: "primary",
        position: "middle",
        icon: "checkmark-circle-outline",
      });


    }).catch((error) => {
      console.log(error);
      this.utilSvc.presentToast({
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
