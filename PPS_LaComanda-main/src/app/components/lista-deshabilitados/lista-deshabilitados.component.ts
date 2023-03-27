import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-lista-deshabilitados',
  templateUrl: './lista-deshabilitados.component.html',
  styleUrls: ['./lista-deshabilitados.component.scss'],
})
export class ListaDeshabilitadosComponent implements OnInit {

  clientes : any = [];
  usuarios : any = [];
  loading : boolean;

  constructor(private fs : FirestoreService, private mailS : MailService, private toast : ToastController,
    private as : AuthService) { 
    this.fs.traerClientes().subscribe(value => {
      this.clientes = value;
      this.clientes = this.clientes.filter(this.filtarHabilitado);
    });
    this.fs.traerUsuarios().subscribe(value =>{
      this.usuarios = value;
    });
  }

  ngOnInit() {
  }

  filtarHabilitado(item){
    if(item.habilitado == "no"){
      return true;
    }else{
      return false;
    }
  }

  habilitar(item : any, accion : boolean){
    let usu : any;
      console.log(item);
      for (const iterator of this.usuarios) {
        if(iterator.DNI == item.DNI){
          usu = iterator;
          console.log(usu);
          break;
        }
      }
    if(accion){
      this.loading = true;
      item.habilitado = 'si';
      usu.habilitado = 'si';
      this.mailS.enviarAvisoHabilitado(item);

      setTimeout(() =>{
        this.fs.modificarCliente(item, item.id).then(()=>{
          this.fs.modificarUsuario(usu,usu.id).then(()=>{
            this.loading = false;
            if(this.fs.sonido){
              this.reproducirSonido("audioBueno2");
            }
            this.SuccessToastEncuesta();
          });
        });
      },2500);
    }else{
      this.loading = true;
      item.habilitado = 'rechazado';
      usu.habilitado = 'rechazado';

      this.mailS.enviarAvisoRechazado(item);

      setTimeout(() =>{
        this.fs.modificarCliente(item, item.id).then(()=>{
          this.fs.modificarUsuario(usu,usu.id).then(()=>{
            this.loading = false;
            if(this.fs.sonido){
            this.reproducirSonido("audioError");
            }
            this.SuccessToastRechazo();
          });
        });
      },2500);
    }
    
  }

  async SuccessToastEncuesta() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Cliente habilitado!!!',
      duration: 1100,
      color: 'success'
    });
    toast.present();
  }

  async SuccessToastRechazo() {
    const toast = await this.toast.create({
      position: 'top',
      message: 'Cliente RECHAZADO!!!',
      duration: 1100,
      color: 'danger'
    });
    toast.present();
  }

  reproducirSonido(dato : string)
  {
    let ruta : string = '../../../assets/sonidos/';
    let nombreArchivo : string = "";
    let audioNombre : string = "";

    audioNombre = dato + ".mp3"; 
    nombreArchivo = ruta + audioNombre;

    this.reproducir(nombreArchivo);
           
  }

  reproducir(ruta : string)
  {
    let audio = new Audio(ruta);
    audio.play();   
  }

}
