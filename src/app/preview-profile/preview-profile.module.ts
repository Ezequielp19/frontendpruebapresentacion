import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewProfileRoutingModule } from './preview-profile-routing.module';
import { MainComponent } from './main/main.component';
import { PhotoNameComponent } from './components/photo-name/photo-name.component';
import { DescriptionComponent } from './components/description/description.component';
import { ProductsComponent } from './components/products/products.component';
import {MatIconModule} from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainComponent,
    PhotoNameComponent,
    DescriptionComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    PreviewProfileRoutingModule,
    MatIconModule,
    TranslateModule
  ]
})
export class PreviewProfileModule { }
