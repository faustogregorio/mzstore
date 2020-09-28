import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { CategoriaComponent } from './../components/categoria/categoria.component';
import { FiltrarComponent } from '../components/filtrar/filtrar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriaComponent,
    FiltrarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class HomeModule { }
