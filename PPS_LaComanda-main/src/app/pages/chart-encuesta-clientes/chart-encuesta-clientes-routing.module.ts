import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartEncuestaClientesPage } from './chart-encuesta-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ChartEncuestaClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartEncuestaClientesPageRoutingModule {}
