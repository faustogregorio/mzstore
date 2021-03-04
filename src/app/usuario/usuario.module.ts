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
import { AdminModule } from '../admin/admin.module';
import { PipesModule } from '../pipes/pipes.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [UsuarioComponent, PedidosComponent, DatosPersonalesComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    AdminModule,
    PipesModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class UsuarioModule { }
