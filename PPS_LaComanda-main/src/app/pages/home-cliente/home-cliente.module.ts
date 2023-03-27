import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClientePageRoutingModule } from './home-cliente-routing.module';

import { HomeClientePage } from './home-cliente.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import { ChatPage } from '../chat/chat.page';
import { CuentaPage } from '../cuenta/cuenta.page';
import { EncuestaClienteComponent } from 'src/app/components/encuesta-cliente/encuesta-cliente.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClientePageRoutingModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  declarations: [HomeClientePage,ChatPage,ListaProductosPage,CuentaPage,EncuestaClienteComponent],
  providers:[AngularFirestore]
})
export class HomeClientePageModule {}
