import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartEncuestaClientesPageRoutingModule } from './chart-encuesta-clientes-routing.module';

import { ChartEncuestaClientesPage } from './chart-encuesta-clientes.page';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartEncuestaClientesPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [ChartEncuestaClientesPage]
})
export class ChartEncuestaClientesPageModule {}
