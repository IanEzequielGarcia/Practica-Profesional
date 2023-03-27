/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ToastController } from '@ionic/angular';
import { AuthService } from 'src/servicios/auth.service';
import { ImagenesService } from 'src/servicios/imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage{

  @ViewChild(IonContent) content: IonContent;

  opcion = 0;
  cargando = false;
  index: any;
  perfil = 0;
  eleccion = false;
  constructor(public ruteo: Router, public authService: AuthService, private imageStore: ImagenesService, private ts: ToastController) {}

  cargarPerfil(dato: number)
  {
    switch(dato)
    {
        case 1:
          this.perfil = 1;
          this.eleccion = true;
          break;

        case 2:
          this.perfil = 2;
          this.eleccion = true;
          break;

        case 0:
          this.perfil = 0;
          break;
    }
  }

  volverInicio()
  {
    this.opcion = 0;
    this.perfil =0;
  }

  mostrarCosasLindas()
  {
    this.opcion = 1;
  }

  mostrarCosasFeas()
  {
    this.opcion = 2;
  }

  mostrarGraficos(){
    this.opcion = 3;
  }

  logout(){
    this.opcion=0;
    this.perfil=0;
    this.authService.logout();
    this.ruteo.navigateByUrl('home');
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  subirFoto()
  {
    let hora = new Date();

    let foto: any = {
      pathFoto : "",
      email : this.authService.actualEmail,
      hora : hora.getFullYear(),
      likes : []
    }

    this.imageStore.addNewToGallery(foto, this.opcion).then((data) =>{
      this.scrollToTop();
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 8000);
    });

  }

  MostrarToast(message: string)
  {
    return this.ts.create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
            position: 'top'
    });
  }
  LogOut(){
    this.authService.logout();
    Swal.fire({
      title: 'Deslogueado con exito!',
      icon:'success',
      heightAuto:false
    });
  }
}
