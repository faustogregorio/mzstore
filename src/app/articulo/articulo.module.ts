import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ArticuloComponent } from './articulo.component';


@NgModule({
  declarations: [ArticuloComponent],
  imports: [
    CommonModule,
    ArticuloRoutingModule
  ],
  exports: [
    ArticuloComponent
  ]
})
export class ArticuloModule { }
