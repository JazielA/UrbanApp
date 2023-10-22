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
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
} from "@angular/fire/firestore";
import { UtilsService } from "./utils.service";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { getStorage, uploadString, ref, getDownloadURL } from "firebase/storage"

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
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

  //=================== obtener documento ===================
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // =================== Agregar un documento ====================
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // ==================== BASE DE DATOS  ========================
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(),path),data_url,'data_url').then(()=>{
      return getDownloadURL(ref(getStorage(),path));
    })
   }
}
