import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatoMonedaPipe } from './formato-moneda.pipe';
import { FormatoFechaPipe } from './formato-fecha.pipe';



@NgModule({
  declarations: [FormatoMonedaPipe, FormatoFechaPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FormatoMonedaPipe,
    FormatoFechaPipe
  ]
})
export class PipesModule { }
