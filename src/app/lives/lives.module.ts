import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LivesRoutingModule } from './lives-routing.module';
import { MainComponent } from './components/main/main.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { LiveComponent } from './components/live.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { DashboardLiveModule } from '../dashboard-live/dashboard-live.module';
import { IconsModule } from '../icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainComponent,
    ViewerComponent,
    LiveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LivesRoutingModule,
    MatTabsModule,
    MatIconModule,
    DashboardLiveModule,
    IconsModule,
    SharedModule,
    TranslateModule

  ]
})
export class LivesModule { }
