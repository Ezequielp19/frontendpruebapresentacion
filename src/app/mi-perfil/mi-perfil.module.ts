import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';


@NgModule({
  declarations: [
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MiPerfilRoutingModule,
    MatIconModule,
    TranslateModule
  ]
})
export class MiPerfilModule { }
