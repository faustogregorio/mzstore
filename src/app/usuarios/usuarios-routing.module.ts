import { UsuarioComponent } from '../usuarios/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: ':id', component: UsuarioComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
