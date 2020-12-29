import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CarouselComponent } from './carousel/carousel.component';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    CategoriesComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatCardModule,
    MatRippleModule,
    FlexLayoutModule,
    MatTooltipModule
  ],
  exports: [
    CommonModule,
    CategoriesComponent,
    CarouselComponent
  ]
})
export class SharedModule { }
