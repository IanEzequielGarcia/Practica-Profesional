import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {
  encuestaEmpleado: boolean;
  encuestaCliente: boolean;
  encuestaSupervisor: boolean;
  constructor() { }

  ngOnInit() {
  }

  handleChange(e) {
    switch (e.detail.value) {
      case 'empleado':
        this.encuestaEmpleado = true;
        this.encuestaCliente = false;
        this.encuestaSupervisor = false;
        break;
      case 'cliente':
        this.encuestaEmpleado = false;
        this.encuestaCliente = true;
        this.encuestaSupervisor = false;
        break;
      case 'supervisor':
        this.encuestaEmpleado = false;
        this.encuestaCliente = false;
        this.encuestaSupervisor = true;
        break;
    }
  }

}
