import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuDuenioPage } from './menu-duenio.page';

const routes: Routes = [
  {
    path: '',
    component: MenuDuenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDuenioPageRoutingModule {}
