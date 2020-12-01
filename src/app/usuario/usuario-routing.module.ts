import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { PedidosComponent } from './pedidos/pedidos.component';

import { UsuarioComponent } from './usuario.component';

const routes: Routes = [{ path: '', component: UsuarioComponent },
{ path: 'pedidos', component: PedidosComponent},
{ path: 'datos', component: DatosPersonalesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
