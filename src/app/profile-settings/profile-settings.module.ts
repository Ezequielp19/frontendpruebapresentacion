import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { MainComponent } from './components/main/main.component';
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { IconsModule } from '../icons/icons.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';

import {ReactiveFormsModule,FormsModule} from '@angular/forms'

import { BillingInformationComponent } from './components/billing-information/billing-information.component';
import { ProfileSettingsDirective } from './components/profile-settings.directive';
import { ShippingSystemComponent } from './components/shipping-system/shipping-system.component';
import { ShippingSystemTwoComponent } from './components/shipping-system-two/shipping-system-two.component';
import { DialogContentExampleDialog } from './components/shipping-system-two/shipping-system-two.component';

import { TranslateModule } from '@ngx-translate/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [ProfileComponent, PersonalInformationComponent, AccountInfoComponent, MainComponent, BillingInformationComponent, ProfileSettingsDirective, ShippingSystemComponent,ShippingSystemTwoComponent,DialogContentExampleDialog],
  imports: [IconsModule,CommonModule, ProfileSettingsRoutingModule, SharedModule, MatTabsModule,  MatDividerModule, MatIconModule,MatListModule,ReactiveFormsModule,FormsModule,MatDialogModule, TranslateModule,MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule],
})
export class ProfileSettingsModule {}
