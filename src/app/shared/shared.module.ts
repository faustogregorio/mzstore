import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CarouselComponent } from './carousel/carousel.component';


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
    MatCardModule
  ],
  exports: [
    CommonModule,
    CategoriesComponent,
    CarouselComponent
  ]
})
export class SharedModule { }
