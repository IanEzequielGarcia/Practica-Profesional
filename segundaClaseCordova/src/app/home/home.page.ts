import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { ModalController } from '@ionic/angular';
import { BaseDatosService } from 'src/servicios/base-datos.service';
import Swal from 'sweetalert2';
import { SplashComponent } from '../splash/splash.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //cargando=true;
  cargando=false;
  constructor(public bd:BaseDatosService,private modalController:ModalController) {
    //this.presentSplash();
  }
  usuario={
    email:'',
    contrasena:''
  }
  enviar(){
      this.bd.Login(this.usuario.email,this.usuario.contrasena).then((a)=>{
        if(a.user.email!=null){
          Swal.fire({
            title: 'Logueado con exito!',
            icon:'success',
            heightAuto:false
          });
        }
      },err=>{
        Swal.fire({
          title: 'USUARIO NO ENCONTRADO!',
          icon:'error',
          heightAuto:false
        });
      })
  }
  async presentSplash(){
    const modal= await this.modalController.create({
      component:SplashComponent,
      cssClass:'my-customm-class'
    })
    modal.present();
    setTimeout(()=>{
      this.cargando=false;
    },2500);
  }
  login(numero:number){
    switch(numero)
    {
      case 1:
        this.usuario.email="test@test.com";
        this.usuario.contrasena="123456";
        break;
      case 2:
        this.usuario.email="maxineiner@gmail.com";
        this.usuario.contrasena="maxineiner@gmail.com";
        break;
      case 3:
        this.usuario.email="juanperez@gmail.com";
        this.usuario.contrasena="123456";
        break;
    }
    this.enviar();
  }
}
