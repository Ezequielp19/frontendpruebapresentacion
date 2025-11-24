import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';




import { LivesCategoryRoutingModule } from './lives-category-routing.module';
import { ElectronicsLivesComponent } from './components/electronics-lives/electronics-lives.component';
import { BeautyLivesComponent } from './components/beauty-lives/beauty-lives.component';
import { ClothesLivesComponent } from './components/clothes-lives/clothes-lives.component';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ElectronicsLivesComponent,
    BeautyLivesComponent,
    ClothesLivesComponent
  ],
  imports: [
    CommonModule,
    LivesCategoryRoutingModule,
    MatIconModule,
    TranslateModule,
    SharedModule
  ]
})
export class LivesCategoryModule { }
