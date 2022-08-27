import { Component } from '@angular/core';
import { BaseDatosService } from 'src/servicios/base-datos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(public bd:BaseDatosService) {}
  usuario={
    email:'',
    contrasena:''
  }
  enviar(){
      this.bd.Login(this.usuario.email,this.usuario.contrasena).then((a)=>{
        if(a.user.email!=null){
          alert("LOGUEADO CON EXITO");
        }
      },err=>{
        alert("USUARIO NO ENCONTRADO");
      })
  }
}
