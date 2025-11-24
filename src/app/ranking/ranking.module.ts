import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking/ranking.component';
import { SectionFeacturedSellersComponent } from './components/section-feactured-sellers/section-feactured-sellers.component';
import { SectionRankingSellersComponent } from './components/section-ranking-sellers/section-ranking-sellers.component';
import { SectionInfoRankingComponent } from './components/section-info-ranking/section-info-ranking.component';
import { RankingRoutingModule } from './ranking-routing.module';
import { IconsModule } from '../icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [RankingComponent, SectionFeacturedSellersComponent, SectionRankingSellersComponent, SectionInfoRankingComponent],
  imports: [IconsModule,CommonModule,  RankingRoutingModule, SharedModule,TranslateModule],
})
export class RankingModule {}
