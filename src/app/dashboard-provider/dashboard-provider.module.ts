import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardProviderRoutingModule } from './dashboard-provider-routing.module';
import { MainComponent } from './components/main/main.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { BillingInfoComponent } from './components/billing-info/billing-info.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BusinessInfoComponent } from './components/business-info/business-info.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { IconsModule } from '../icons/icons.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MainComponent,
    PersonalInfoComponent,
    BillingInfoComponent,
    AccountInfoComponent,
    ProfileComponent,
    BusinessInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardProviderRoutingModule,
    SharedModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    TranslateModule
  ]
})
export class DashboardProviderModule { } 