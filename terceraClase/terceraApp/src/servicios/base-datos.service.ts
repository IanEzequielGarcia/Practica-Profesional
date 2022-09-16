import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(public auth: AngularFireAuth) { }

  Login(email:string,password:string)
  {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  isLoggedIn() {
    return this.auth.authState;
  }
  LogOut():Promise<any>{
    return this.auth.signOut();
  }
}

