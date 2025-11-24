import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFleteRoutingModule } from './dashboard-flete-routing.module';
import { MainComponent } from './components/main/main.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';


import { MatTabsModule } from '@angular/material/tabs';
import { IconsModule } from '../icons/icons.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent,
    PersonalInfoComponent,
    VehicleInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardFleteRoutingModule,
    MatTabsModule,
    IconsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ]
})
export class DashboardFleteModule { }
