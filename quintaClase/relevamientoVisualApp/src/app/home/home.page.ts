import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public formLogin: FormGroup;
  errorMessage = '';
  mostrarError = false;

  user = {
    email: '',
    password: ''
  };

  constructor(public fb: FormBuilder, public ruteo: Router, public authService: AuthService, private toastController: ToastController) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  logs: string[] = [];


  handleChange(e) {
    switch (e.detail.value) {
      case 'usuario1':
        this.logeoAutomatico('admin@admin.com', '111111');
        break;
      case 'usuario2':
        this.logeoAutomatico('invitado@invitado.com', '222222');
        break;
      case 'usuario3':
        this.logeoAutomatico('usuario@usuario.com', '333333');
        break;
    }
  }

  loguearse() {
    try {
      const email = this.formLogin.getRawValue().email;
      const password = this.formLogin.getRawValue().password;
      this.authService.login(email, password)
        .then(
          res => {
            if (res == null) {
              console.log('error al logearse', res);
            } else {
              console.log('ingreso!: ', res);
              this.mostrarError = false;
              this.ruteo.navigateByUrl('main');
              this.formLogin.reset();
            }
          })
        .catch((error: any) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Email invalido.';
              break;
            case 'auth/user-disabled':
              this.errorMessage = 'Usuario deshabilitado.';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'Contraseña incorrecta.';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              break;
            default:
              this.errorMessage = 'Error';
              break;
          }
          this.presentToast('top', 'medium');
        });
    } catch (error) {
      console.log('Error al ingresar', error);
    }
  }

  logeoAutomatico(email: string, password: string) {
    this.formLogin.controls.email.setValue(email);
    this.formLogin.controls.password.setValue(password);
    this.loguearse();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', color: 'primary' | 'light' | 'medium') {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      position,
      color,
      icon: 'key',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }]
    });

    await toast.present();
  }
}
