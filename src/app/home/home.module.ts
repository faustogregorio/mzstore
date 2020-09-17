import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { CategoriaComponent } from './../components/categoria/categoria.component';
import { FiltrarComponent } from '../components/filtrar/filtrar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriaComponent,
    FiltrarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
