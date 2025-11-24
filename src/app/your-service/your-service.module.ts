import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from '../icons/icons.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { MatTabsModule } from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { YourServiceRoutingModule } from './your-service-routing.module';
import { MainComponent } from './components/main/main.component';
import { NameServiceComponent } from './components/name-service/name-service.component';
import { DescriptionServiceComponent } from './components/description-service/description-service.component';
import { BillingPayServiceComponent } from './components/billing-pay-service/billing-pay-service.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MainComponent,
    NameServiceComponent,
    DescriptionServiceComponent,
    BillingPayServiceComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    YourServiceRoutingModule,
    IconsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    TranslateModule
  ]
})
export class YourServiceModule { }
