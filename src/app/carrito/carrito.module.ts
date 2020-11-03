import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { CarritoComponent } from './carrito.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [CarritoComponent],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    FlexLayoutModule
  ]
})
export class CarritoModule { }
