import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { PrincingPlansRoutingModule } from './princing-plans-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PrincingPlansRoutingModule,
    TranslateModule
  ]
})
export class PrincingPlansModule { }
