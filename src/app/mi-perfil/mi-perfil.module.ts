import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { CalificacionesModalComponent } from './components/calificaciones-modal/calificaciones-modal.component';


@NgModule({
  declarations: [
    MiPerfilComponent,
    CalificacionesModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MiPerfilRoutingModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class MiPerfilModule { }
