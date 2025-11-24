import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { LegalComponent } from './components/legal/legal.component';
import { ComissionsComponent } from './components/comissions/comissions.component';
import { CompaniesAssociatedComponent } from './components/companies-associated/companies-associated.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyPoliticsComponent } from './components/privacy-politics/privacy-politics.component';

const routes: Routes = [
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'terms-condition', component: TermsConditionsComponent
  },
  {
    path: 'comissions', component: ComissionsComponent
  },
  {
    path: 'companies-associated', component: CompaniesAssociatedComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'privacy-politics', component: PrivacyPoliticsComponent
  },
  {
    path: 'legal', component: LegalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterRoutingModule {}