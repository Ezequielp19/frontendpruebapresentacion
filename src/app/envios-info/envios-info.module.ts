import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';



import { EnviosInfoRoutingModule } from './envios-info-routing.module';
import { MainComponent } from './main/main.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { RegistroSectionComponent } from './components/registro-section/registro-section.component';
import { VehiculosSectionComponent } from './components/vehiculos-section/vehiculos-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent,
    TimelineComponent,
    RegistroSectionComponent,
    VehiculosSectionComponent,
    HeroSectionComponent
  ],
  imports: [
    CommonModule,
    EnviosInfoRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    TranslateModule,
    FormsModule, 
    HttpClientModule


  ],
  exports:[
    TimelineComponent,
    RegistroSectionComponent,
    VehiculosSectionComponent,
    HeroSectionComponent
  ]
})
export class EnviosInfoModule { }
