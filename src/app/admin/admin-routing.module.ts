import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticuloComponent } from './add-articulo/add-articulo.component';

import { AdminComponent } from './admin.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'add-articulo', component: AddArticuloComponent},
  { path: 'articulos', component: ArticulosComponent},
  { path: 'pedidos', component: PedidosComponent},
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'ajustes', component: AjustesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
