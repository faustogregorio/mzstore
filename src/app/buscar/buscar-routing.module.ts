import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarComponent } from './buscar.component';
import { FiltrarArticulosComponent } from './filtrar-articulos/filtrar-articulos.component';

const routes: Routes = [
  { path: '', component: BuscarComponent },
  { path: ':buscar', component: FiltrarArticulosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarRoutingModule { }
