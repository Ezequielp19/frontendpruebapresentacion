import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { IconsModule } from '../icons/icons.module';

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { MainComponent } from './main/main.component';
import { SectionProfileComponent } from './components/section-profile/section-profile.component';
import { SectionRatingComponent } from './components/section-rating/section-rating.component';
import { SectionMainComponent } from './components/section-main/section-main.component';
import { DialogContentExampleDialog } from './components/section-main/section-main.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent,
    SectionProfileComponent,
    SectionRatingComponent,
    SectionMainComponent,
    DialogContentExampleDialog
  ],
  imports: [
    CommonModule,
    DashboardUserRoutingModule,
    MatSidenavModule,
    MatIconModule,
    IconsModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class DashboardUserModule { }
