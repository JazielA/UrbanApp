import { Component, OnInit, inject } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { UtilsService } from "src/app/services/utils.service";
import { AddTripComponent } from "src/app/shared/components/add-trip/add-trip.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  ngOnInit() {}

  // Cerrar sesion
  signOut() {
    this.firebaseSvc.signOut();
  }

  // Agregar un viaje
  addTrip() {
    this.utilSvc.presentModal({
      component: AddTripComponent,
      cssClass: "add-trip-modal",
    });
  }
}
