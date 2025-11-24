import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';




import { BestSellingProdRoutingModule } from './best-selling-prod-routing.module';
import { ProdListComponent } from './components/prod-list/prod-list.component';
import { MainComponent } from './components/main/main.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ProdListComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    BestSellingProdRoutingModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class BestSellingProdModule { }
