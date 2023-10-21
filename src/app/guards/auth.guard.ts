import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
import { UtilsService } from "../services/utils.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = localStorage.getItem("user");
    return new Promise((resolve) => {
      // este metodo nos indica si el usuario esta registrado o no
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (auth) {
          if (user) resolve(true);
        } else {
          this.firebaseSvc.signOut();
          resolve(false);
        }
      });
    });
  }
}
