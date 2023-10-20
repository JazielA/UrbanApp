import { Injectable, inject } from "@angular/core";
// para usar funciones de autenticacion de firebase
import { AngularFireAuth } from "@angular/fire/compat/auth";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updateCurrentUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { User } from "../models/user.model";

import { AngularFirestore } from "@angular/fire/compat/firestore";
import { getFirestore, setDoc, doc, getDoc } from "@angular/fire/firestore";
import { UtilsService } from "./utils.service";
@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilSvc = inject(UtilsService);

  //====restriccion para que no pueda entrar sin login y pass
  getAuth() {
    return getAuth();
  }

  // Autenticacion
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crear usuario
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar  usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  //=====enviar un email para reestablecer contraseña====
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
  // funcion cerrar sesion y remover los datos del local storage
  signOut() {
    getAuth().signOut();
    localStorage.removeItem("user");
    this.utilSvc.routerLink("/auth");
  }

  // ==================== BASE DE DATOS  ========================

  // Setear un documento, con esta funcion nos guardara los datos del usuario
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //=====obtener documento
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
