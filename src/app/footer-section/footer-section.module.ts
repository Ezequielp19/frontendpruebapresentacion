import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { ComissionsComponent } from './components/comissions/comissions.component';
import { ContactComponent } from './components/contact/contact.component';
import { LegalComponent } from './components/legal/legal.component';
import { PrivacyPoliticsComponent } from './components/privacy-politics/privacy-politics.component';
import { CompaniesAssociatedComponent } from './components/companies-associated/companies-associated.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    AboutUsComponent,
    TermsConditionsComponent,
    ComissionsComponent,
    ContactComponent,
    LegalComponent,
    PrivacyPoliticsComponent,
    CompaniesAssociatedComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class FooterSectionModule { }
