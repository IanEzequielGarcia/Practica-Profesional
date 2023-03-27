import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-chat-mozo',
  templateUrl: './chat-mozo.page.html',
  styleUrls: ['./chat-mozo.page.scss'],
})
export class ChatMozoPage implements OnInit {

  @Input() receptor : any;
  mensajes : any;
  mensaje : any;
  mensajeEnviar: any = "";

  constructor(private chat : ChatService,public as : AuthService, public fs : FirestoreService) { 
    this.mensajes = chat.items;
    console.log(this.mensajes);
    this.mensaje = {
      user: '',
      message: '',
      date: Date().toString(),
    }
  }

  ngOnInit(){
    
  }

  sendMessage()
  {
    let hora = new Date();

    this.mensaje.user = this.as.loggedUser.nombre;
    this.mensaje.receptor = this.receptor.nombre;
    this.mensaje.message = this.mensajeEnviar;

    this.mensaje.date = hora.getHours() + ':' + hora.getMinutes();
    this.chat.sendMessage(this.mensaje);
    this.fs.eliminarConsulta(this.receptor.id);
    this.mensaje.message = '';
    this.mensajeEnviar = '';

  }


}
