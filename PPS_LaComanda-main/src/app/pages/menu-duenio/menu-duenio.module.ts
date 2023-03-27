import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDuenioPageRoutingModule } from './menu-duenio-routing.module';

import { MenuDuenioPage } from './menu-duenio.page';
import { AltaDuenioSupComponent } from 'src/app/components/alta-duenio-sup/alta-duenio-sup.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatPseudoCheckboxModule } from '@angular/material/core';

import { ListaDeshabilitadosComponent } from 'src/app/components/lista-deshabilitados/lista-deshabilitados.component';
import { AltaEmpleadoPage } from 'src/app/components/alta-empleado/alta-empleado.page';
import { EncuestaSupervisorComponent } from 'src/app/components/encuesta-supervisor/encuesta-supervisor.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDuenioPageRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatPseudoCheckboxModule,
    MatMenuModule,
    MatRadioModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MenuDuenioPage,AltaDuenioSupComponent,ListaDeshabilitadosComponent,AltaEmpleadoPage,EncuestaSupervisorComponent]
})
export class MenuDuenioPageModule {}
