import { Injectable, inject } from '@angular/core';
// para usar funciones de autenticacion de firebase
import { AngularFireAuth } from '@angular/fire/compat/auth'

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updateCurrentUser } from 'firebase/auth';
import { User } from '../models/user.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);


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





  // ==================== BASE DE DATOS  ========================


  // Setear un documento, con esta funcion nos guardara los datos del usuario
setDocument(path:string, data: any){
  return setDoc(doc(getFirestore(),path), data);
}







}
