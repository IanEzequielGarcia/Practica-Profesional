import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCocinaPageRoutingModule } from './home-cocina-routing.module';

import { HomeCocinaPage } from './home-cocina.page';
import { EncuestaEmpleadoComponent } from 'src/app/components/encuesta-empleado/encuesta-empleado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCocinaPageRoutingModule
  ],
  declarations: [HomeCocinaPage,EncuestaEmpleadoComponent]
})
export class HomeCocinaPageModule {}
