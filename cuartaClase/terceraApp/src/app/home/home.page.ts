import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SplashScreen } from '@capacitor/splash-screen';
import { ModalController, NavController } from '@ionic/angular';
import { BaseDatosService } from 'src/servicios/base-datos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  cargando=true;
  //cargando=false;
  loginForm: FormGroup;
  constructor(public bd:BaseDatosService,private modalController:ModalController,public fb:FormBuilder,public navCtrl: NavController) {
    this.presentSplash();
  }
  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: [null,Validators.required],
      contrasena: [null, Validators.required],
    });
  }

  enviar(){
    let r=this.loginForm.getRawValue();
      this.bd.Login(r.email,r.contrasena).then((a)=>{
        if(a.user.email!=null){
          Swal.fire({
            title: 'Logueado con exito!',
            icon:'success',
            heightAuto:false
          });
        }
        setTimeout(()=>{
          this.navCtrl.navigateForward('main');
        },1000);
      },err=>{
        Swal.fire({
          title: 'USUARIO NO ENCONTRADO!',
          icon:'error',
          heightAuto:false
        });
      })
  }
  async presentSplash(){
    setTimeout(()=>{
      this.cargando=false;
    },2500);
  }
  login(numero:number){
    switch(numero)
    {
      case 1:
        this.loginForm.controls.email.setValue("test@test.com");
        this.loginForm.controls.contrasena.setValue("123456");
        //this.usuario.email="test@test.com";
        //this.usuario.contrasena="123456";
        break;
      case 2:
        this.loginForm.controls.email.setValue("maxineiner@gmail.com");
        this.loginForm.controls.contrasena.setValue("maxineiner@gmail.com");
        //this.usuario.email="maxineiner@gmail.com";
        //this.usuario.contrasena="maxineiner@gmail.com";
        break;
      case 3:
        this.loginForm.controls.email.setValue("juanperez@gmail.com");
        this.loginForm.controls.contrasena.setValue("123456");
        //this.usuario.email="juanperez@gmail.com";
        //this.usuario.contrasena="123456";
        break;
    }
    this.enviar();
  }
}
