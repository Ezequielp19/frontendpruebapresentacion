import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemPaymentRoutingModule } from './system-payment-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { MainComponent } from './components/main/main.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SystemPaymentRoutingModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    TranslateModule
  ]
})
export class SystemPaymentModule { }
