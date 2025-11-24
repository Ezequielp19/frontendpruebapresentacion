import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { IconsModule } from '../icons/icons.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardProfesionalRoutingModule } from './dashboard-profesional-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    PersonalInfoComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardProfesionalRoutingModule,
    MatTabsModule,
    IconsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardProfesionalModule { }
