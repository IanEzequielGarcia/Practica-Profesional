import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  items : Observable<any[]>;
  chat : string = "/chat";

  constructor(private db : AngularFireDatabase) {
    this.items = db.list(this.chat).valueChanges();
   }

  sendMessage(mensaje : any)
  {
    const itemsRef = this.db.list(this.chat);
    console.log(mensaje);
    itemsRef.push(mensaje);
  }
}
