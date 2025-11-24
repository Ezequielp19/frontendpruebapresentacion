import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconsModule } from '../icons/icons.module';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { WorkerCardComponent } from './components/worker-card/worker-card.component';
import { FloatingLiveButtonComponent } from './components/floating-live-button/floating-live-button.component';
import { ModalComponent } from './modal/modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { SolonumDirective } from './codeverif/solonum.directive';


import { CodeverifComponent } from './codeverif/codeverif.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderRegisterComponent } from './components/header-register/header-register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EmailVerifPasswordComponent } from './components/email-verif-password/email-verif-password.component';
import { BoxLivesMainComponent } from './components/box-lives-main/box-lives-main.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { GeminiChatbotComponent } from './components/gemini-chatbot/gemini-chatbot.component';
import { DialogContentExampleDialog } from './components/nav/nav.component';
import { TranslateModule } from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import { CardLiveDashboardComponent } from './components/card-live-dashboard/card-live-dashboard.component';
import { TranslateCapitalizePipe } from './pipes/translate-capitalize.pipe';
import { ValidationErrorsComponent } from './components/validation-errors/validation-errors.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderLoginComponent,
    WorkerCardComponent,
    ModalComponent,
    SolonumDirective,
    CodeverifComponent,
    NavComponent,
    HeaderRegisterComponent,
    HeaderLoginComponent,
    ChangePasswordComponent,
    EmailVerifPasswordComponent,
    BoxLivesMainComponent,
    ChatbotComponent,
    GeminiChatbotComponent,
    DialogContentExampleDialog,
    CardLiveDashboardComponent,
    TranslateCapitalizePipe,
    ValidationErrorsComponent,
    FloatingLiveButtonComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WorkerCardComponent,
    FloatingLiveButtonComponent,
    ModalComponent,
    HeaderLoginComponent,
    BoxLivesMainComponent,
    ChatbotComponent,
    GeminiChatbotComponent,
    CardLiveDashboardComponent,
    TranslateCapitalizePipe,
    ValidationErrorsComponent
  ],
  imports: [
    IconsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    MatTreeModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class SharedModule { }
