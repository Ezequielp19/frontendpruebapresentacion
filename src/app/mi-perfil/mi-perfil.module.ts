import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { CalificacionesModalComponent } from './components/calificaciones-modal/calificaciones-modal.component';
import { CambiarPasswordModalComponent } from './components/cambiar-password-modal/cambiar-password-modal.component';


@NgModule({
  declarations: [
    MiPerfilComponent,
    CalificacionesModalComponent,
    CambiarPasswordModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MiPerfilRoutingModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class MiPerfilModule { }
