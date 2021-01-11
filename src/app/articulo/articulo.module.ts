import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ArticuloComponent } from './articulo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { SharedModule } from '../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [ArticuloComponent],
  imports: [
    CommonModule,
    ArticuloRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    SharedModule,
    MatTabsModule,
    MatTooltipModule
  ],
  exports: [
    ArticuloComponent
  ]
})
export class ArticuloModule { }
