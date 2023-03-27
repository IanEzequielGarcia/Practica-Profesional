import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-menu-duenio',
  templateUrl: './menu-duenio.page.html',
  styleUrls: ['./menu-duenio.page.scss'],
})
export class MenuDuenioPage implements OnInit {
  opcionDuenio: boolean = false;
  opcionDeshabilitado: boolean = false;
  opcionEmpleado: boolean = false;
  opcionEncuesta: boolean = false;
  
  constructor(private router: Router, private push: PushService) {
    this.push.getUser();
   }

  ngOnInit() {
  }

  handleChange(e) {
    switch (e.detail.value) {
      case 'dueñoSup':
        this.opcionDuenio = true;
        this.opcionDeshabilitado = false;
        this.opcionEmpleado = false;
        this.opcionEncuesta = false;
        break;
      case 'deshabilitar':
        this.opcionDuenio = false;
        this.opcionDeshabilitado = true;
        this.opcionEmpleado = false;
        this.opcionEncuesta = false;
        break;
      case 'empleado':
        this.opcionDuenio = false;
        this.opcionDeshabilitado = false;
        this.opcionEmpleado = true;
        this.opcionEncuesta = false;
        break;
      case 'encuesta':
        this.opcionDuenio = false;
        this.opcionDeshabilitado = false;
        this.opcionEmpleado = false;
        this.opcionEncuesta = true;
        break;
    }
  }

  irAGraficos(){
    this.router.navigate(['/chart-encuesta-supervisor']);
  }
}
