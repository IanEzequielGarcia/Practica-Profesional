import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { CosasLindasFeasComponent } from '../cosas-lindas-feas/cosas-lindas-feas.component';
import { GraficosComponent } from '../graficos/graficos.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    AngularFirestoreModule,
  ],
  declarations: [MainPage,CosasLindasFeasComponent,PerfilComponent,GraficosComponent]
})
export class MainPageModule {}
