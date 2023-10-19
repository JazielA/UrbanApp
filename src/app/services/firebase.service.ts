import { Injectable, inject } from '@angular/core';
// para usar funciones de autenticacion de firebase
import { AngularFireAuth } from '@angular/fire/compat/auth'

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updateCurrentUser } from 'firebase/auth';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);


  // Autenticacion
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crear usuario
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar  usuario
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName});
  }

}
