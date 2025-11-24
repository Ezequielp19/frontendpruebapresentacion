import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

import { DashboardLiveRoutingModule } from './dashboard-live-routing.module';
import { MainComponent } from './components/main/main.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardLiveDashboardComponent } from '../shared/components/card-live-dashboard/card-live-dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,

  ],
  imports: [
    CommonModule,
    DashboardLiveRoutingModule,
    MatIconModule,
    TranslateModule,
    SharedModule,

]
})
export class DashboardLiveModule { }
