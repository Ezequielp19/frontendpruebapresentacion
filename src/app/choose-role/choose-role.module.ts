import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseRoleRoutingModule } from './choose-role-routing.module';
import { MainComponent } from './components/main/main.component';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ChooseRoleRoutingModule,
    TranslateModule
  ]
})
export class ChooseRoleModule { }
