import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyProdRoutingModule } from './buy-prod-routing.module';
import { MainComponent } from './components/main/main.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    BuyProdRoutingModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    TranslateModule
  ]
})
export class BuyProdModule { }
