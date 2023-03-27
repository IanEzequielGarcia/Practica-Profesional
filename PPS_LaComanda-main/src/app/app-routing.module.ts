import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'

  },
  {
    path: 'alta-cliente',
    loadChildren: () => import('./pages/alta-cliente/alta-cliente.module').then( m => m.AltaClientePageModule)

  },
  {
    path: 'menu-duenio',
    loadChildren: () => import('./pages/menu-duenio/menu-duenio.module').then( m => m.MenuDuenioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'alta-anonimo',
    loadChildren: () => import('./pages/alta-anonimo/alta-anonimo.module').then( m => m.AltaAnonimoPageModule)

  },
  {
    path: 'home-cliente',
    loadChildren: () => import('./pages/home-cliente/home-cliente.module').then( m => m.HomeClientePageModule)
  },
  {
    path: 'encuestas',
    loadChildren: () => import('./pages/encuestas/encuestas.module').then( m => m.EncuestasPageModule)
  },
  {
    path: 'lista-productos',
    loadChildren: () => import('./pages/lista-productos/lista-productos.module').then( m => m.ListaProductosPageModule)
  },

  {
    path: 'home-metre',
    loadChildren: () => import('./pages/home-metre/home-metre.module').then( m => m.HomeMetrePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chart-encuesta-clientes',
    loadChildren: () => import('./pages/chart-encuesta-clientes/chart-encuesta-clientes.module').then( m => m.ChartEncuestaClientesPageModule)
  },  {
    path: 'home-mozo',
    loadChildren: () => import('./pages/home-mozo/home-mozo.module').then( m => m.HomeMozoPageModule)
  },
  {
    path: 'chat-mozo',
    loadChildren: () => import('./pages/chat-mozo/chat-mozo.module').then( m => m.ChatMozoPageModule)
  },
  {
    path: 'home-cocina',
    loadChildren: () => import('./pages/home-cocina/home-cocina.module').then( m => m.HomeCocinaPageModule)
  },
  {
    path: 'home-bartender',
    loadChildren: () => import('./pages/home-bartender/home-bartender.module').then( m => m.HomeBartenderPageModule)
  },
  {
    path: 'chart-encuesta-supervisor',
    loadChildren: () => import('./pages/chart-encuesta-supervisor/chart-encuesta-supervisor.module').then( m => m.ChartEncuestaSupervisorPageModule)
  },
  {
    path: 'chart-encuesta-empleados',
    loadChildren: () => import('./pages/chart-encuesta-empleados/chart-encuesta-empleados.module').then( m => m.ChartEncuestaEmpleadosPageModule)
  }



]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


