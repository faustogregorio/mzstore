import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';

@NgModule({
  declarations: [UsuarioComponent, PedidosComponent, DatosPersonalesComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UsuarioModule { }
