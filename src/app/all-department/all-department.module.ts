import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//angular-material
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { IconsModule } from '../icons/icons.module';
import {MatDividerModule} from '@angular/material/divider';



import { AllDepartmentRoutingModule } from './all-department-routing.module';
import { SectionMainComponent } from './components/section-main/section-main.component';
import { SectionBannerComponent } from './components/section-banner/section-banner.component';
import { MainComponent } from './main/main.component';
import { SectionCompaniesComponent } from './components/section-companies/section-companies.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SectionMainComponent,
    SectionBannerComponent,
    MainComponent,
    SectionCompaniesComponent
  ],
  imports: [
    CommonModule,
    AllDepartmentRoutingModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    IconsModule,MatDividerModule,
    TranslateModule
  ],
  exports: [
    MatDividerModule
  ]
})
export class AllDepartmentModule { }
