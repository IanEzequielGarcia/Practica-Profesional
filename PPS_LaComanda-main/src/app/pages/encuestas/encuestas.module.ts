import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestasPageRoutingModule } from './encuestas-routing.module';

import { EncuestasPage } from './encuestas.page';
import { EncuestaClienteComponent } from 'src/app/components/encuesta-cliente/encuesta-cliente.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { EncuestaSupervisorComponent } from 'src/app/components/encuesta-supervisor/encuesta-supervisor.component';
import { EncuestaEmpleadoComponent } from 'src/app/components/encuesta-empleado/encuesta-empleado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestasPageRoutingModule,
    MatRadioModule,
    MatCheckboxModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EncuestasPage]
})
export class EncuestasPageModule {}
