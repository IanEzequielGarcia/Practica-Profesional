import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartEncuestaSupervisorPage } from './chart-encuesta-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: ChartEncuestaSupervisorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartEncuestaSupervisorPageRoutingModule {}
