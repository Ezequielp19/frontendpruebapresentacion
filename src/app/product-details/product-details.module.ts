import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { MainComponent } from './components/main/main.component';
import { ProdSliderComponent } from './components/prod-slider/prod-slider.component';


import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent,
    ProdSliderComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    CarouselModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductDetailsModule { }
