import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarRoutingModule } from './buscar-routing.module';
import { BuscarComponent } from './buscar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FiltrarComponent } from '../components/filtrar/filtrar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FiltrarArticulosComponent } from './filtrar-articulos/filtrar-articulos.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PipesModule } from '../pipes/pipes.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    BuscarComponent,
    FiltrarComponent,
    FiltrarArticulosComponent
  ],
  imports: [
    CommonModule,
    BuscarRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    MatTooltipModule,
    PipesModule,
    MatDialogModule
  ]
})
export class BuscarModule { }
