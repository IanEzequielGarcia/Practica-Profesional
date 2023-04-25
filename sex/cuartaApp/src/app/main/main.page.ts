import { Component, OnInit } from '@angular/core';
import { BaseDatosService } from 'src/servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(public bd:BaseDatosService) { }

  ngOnInit() {
  }
  LogOut(){
    this.bd.LogOut().then((a)=>{
      Swal.fire({
        title: 'Deslogueado con exito!',
        icon:'success',
        heightAuto:false
      });
    })
    }
  
}
