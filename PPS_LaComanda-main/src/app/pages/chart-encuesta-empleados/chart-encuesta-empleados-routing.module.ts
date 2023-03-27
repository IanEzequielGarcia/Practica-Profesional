import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartEncuestaEmpleadosPage } from './chart-encuesta-empleados.page';

const routes: Routes = [
  {
    path: '',
    component: ChartEncuestaEmpleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartEncuestaEmpleadosPageRoutingModule {}
