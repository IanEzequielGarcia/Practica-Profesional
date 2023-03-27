import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeMetrePageRoutingModule } from './home-metre-routing.module';

import { HomeMetrePage } from './home-metre.page';
import { EncuestaEmpleadoComponent } from 'src/app/components/encuesta-empleado/encuesta-empleado.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeMetrePageRoutingModule,
    MatMenuModule,
    MatRadioModule,
  ],
  declarations: [HomeMetrePage,EncuestaEmpleadoComponent]
})
export class HomeMetrePageModule {}
