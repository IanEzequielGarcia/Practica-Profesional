import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartEncuestaEmpleadosPageRoutingModule } from './chart-encuesta-empleados-routing.module';

import { ChartEncuestaEmpleadosPage } from './chart-encuesta-empleados.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartEncuestaEmpleadosPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [ChartEncuestaEmpleadosPage]
})
export class ChartEncuestaEmpleadosPageModule {}
