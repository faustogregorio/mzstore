import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    FlexLayoutModule
  ]
})
export class PageNotFoundModule { }
