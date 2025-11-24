import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SectionVenderComponent } from './components/section-vender/section-vender.component';
import { SectionSmartBusinessComponent } from './components/section-smart-business/section-smart-business.component';
import { SectionIncomeComponent } from './components/section-income/section-income.component';
import { HeroComponent } from './components/hero/hero.component';
import { SectionServiceBusinessComponent } from './components/section-service-business/section-service-business.component';
import { SearchComponent } from './containers/search/search.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SectionLastAdmissionComponent } from './components/section-last-admission/section-last-admission.component';
import { CardComponent } from './containers/card/card.component';
import { IconsModule } from '../icons/icons.module';
import { SectionFreelanceComponent } from './components/section-freelance/section-freelance.component';
import { SwiperModule } from 'swiper/angular';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LiveSectionComponent } from './components/live-section/live-section.component';
import { LiveEmprComponent } from './components/live-empr/live-empr.component';
import { SellersPrimaryComponent } from './components/sellers-primary/sellers-primary.component';
import { SharedModule } from '../shared/shared.module';
import { DialogContentExampleDialog } from './components/section-income/section-income.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    SectionVenderComponent,
    SectionSmartBusinessComponent,
    SectionIncomeComponent,
    SectionServiceBusinessComponent,
    SearchComponent,
    SectionLastAdmissionComponent,
    CardComponent,
    SectionFreelanceComponent,
    LiveSectionComponent,
    LiveEmprComponent,
    SellersPrimaryComponent,
    DialogContentExampleDialog
  ],
  imports: [CommonModule, CarouselModule, IconsModule, HomeRoutingModule, SwiperModule,MatIconModule,SharedModule,MatTooltipModule,MatDialogModule,TranslateModule,NgbCarouselModule,RouterModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
