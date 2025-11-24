import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderRegisterComponent } from './components/header-register/header-register.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { EmailVerifPasswordComponent } from './components/email-verif-password/email-verif-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { GeminiChatbotComponent } from './components/gemini-chatbot/gemini-chatbot.component';

const routes: Routes = [
  {
    path: 'register', component: HeaderRegisterComponent
  },
  {
    path: 'login', component: HeaderLoginComponent
  },
  {
    path: 'email-verif-password', component: EmailVerifPasswordComponent
  },
  {
    path: 'change-password', component:ChangePasswordComponent
  },
  {
    path: 'chat', component:GeminiChatbotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
