import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [UsuariosComponent, UsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UsuariosModule { }
