import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartEncuestaSupervisorPageRoutingModule } from './chart-encuesta-supervisor-routing.module';

import { ChartEncuestaSupervisorPage } from './chart-encuesta-supervisor.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartEncuestaSupervisorPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [ChartEncuestaSupervisorPage]
})
export class ChartEncuestaSupervisorPageModule {}
