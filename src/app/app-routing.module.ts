import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ModalComponent } from './shared/modal/modal.component';
import {CodeverifComponent} from './shared/codeverif/codeverif.component'
import { HeaderRegisterComponent } from './shared/components/header-register/header-register.component';
import { HeaderLoginComponent } from './shared/components/header-login/header-login.component';
import { EmailVerifPasswordComponent } from './shared/components/email-verif-password/email-verif-password.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { MainComponent } from './system-payment/components/main/main.component';
import { SectionIncomeComponent } from './home/components/section-income/section-income.component';
import { GeminiChatbotComponent } from './shared/components/gemini-chatbot/gemini-chatbot.component';
// import { AboutUsComponent } from './footer-section/components/about-us/about-us.component';
import { AboutUsComponent } from './footer-section/components/about-us/about-us.component';
import { ComissionsComponent } from './footer-section/components/comissions/comissions.component';
import { CompaniesAssociatedComponent } from './footer-section/components/companies-associated/companies-associated.component';
import { ContactComponent } from './footer-section/components/contact/contact.component';
import { LegalComponent } from './footer-section/components/legal/legal.component';
import { PrivacyPoliticsComponent } from './footer-section/components/privacy-politics/privacy-politics.component';
import { TermsConditionsComponent } from './footer-section/components/terms-conditions/terms-conditions.component';
import { ElectronicsLivesComponent } from './lives-category/components/electronics-lives/electronics-lives.component';
import { BeautyLivesComponent } from './lives-category/components/beauty-lives/beauty-lives.component';
import { ClothesLivesComponent } from './lives-category/components/clothes-lives/clothes-lives.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',

      },
      {
        path: 'login',
        component: HeaderLoginComponent
      },
      {
        path: 'register',
        component: HeaderRegisterComponent
      },
      {
        path: 'email-verif-password', component: EmailVerifPasswordComponent
      },
      {
        path: 'change-password', component:ChangePasswordComponent
      },
      {
        path:'payment-method', component:MainComponent
      },
      {
        path: 'chat', component: GeminiChatbotComponent
      },
      {
        path: 'about-us', component: AboutUsComponent
      },
      {
        path: 'comisiones', component: ComissionsComponent
      },
      {
        path: 'empresas-asociadas', component: CompaniesAssociatedComponent
      },
      {
        path: 'contacto', component: ContactComponent
      },
      {
        path: 'legal', component: LegalComponent
      },
      {
        path: 'politica-privacidad', component: PrivacyPoliticsComponent
      },
      {
        path: 'terminos-condiciones', component: TermsConditionsComponent
      },
      {
        path: 'lives-electronics',component: ElectronicsLivesComponent
      },
      {
        path: 'lives-beauty', component:BeautyLivesComponent
      },
      {
        path: 'lives-clothes', component: ClothesLivesComponent
      },


      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },

      {
        path: 'ranking',
        loadChildren: () => import('./ranking/ranking.module').then((m) => m.RankingModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./products-catalog/products-catalog.module').then((m) => m.ProductsCatalogModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-settings/profile-settings.module').then((m) => m.ProfileSettingsModule),
        canActivate: [AuthGuard] // Proteger - requiere autenticación
      },
      {
        path: 'profile-flete',
        loadChildren: () => import('./dashboard-flete/dashboard-flete.module').then((m) => m.DashboardFleteModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['delivery', 'flete', 'admin'] } // Solo delivery y admins
      },
      {
        path: 'your-service',
        loadChildren: () => import('./your-service/your-service.module').then((m) => m.YourServiceModule ),
        canActivate: [AuthGuard] // Proteger - requiere autenticación
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard-user/dashboard-user.module').then((m) => m.DashboardUserModule),
        canActivate: [AuthGuard] // Proteger - requiere autenticación
      },
      {
        path: 'dashboard-profesional',
        loadChildren: () => import('./dashboard-profesional/dashboard-profesional.module').then((m) => m.DashboardProfesionalModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['professional', 'profesional', 'admin'] } // Solo profesionales y admins
      },
      {
        path: 'dashboard-provider',
        loadChildren: () => import('./dashboard-provider/dashboard-provider.module').then((m) => m.DashboardProviderModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['provider', 'proveedor', 'admin'] } // Solo providers y admins
      },
      {
        path: 'pricing-plans',
        loadChildren: () => import('./princing-plans/princing-plans.module').then((m) => m.PrincingPlansModule)
      },
      {
        path: 'preview-profile',
        loadChildren: () => import('./preview-profile/preview-profile.module').then((m) => m.PreviewProfileModule)
      },
      {
        path: 'payment-method',
        loadChildren: () =>import('./system-payment/system-payment.module').then((m) => m.SystemPaymentModule),
        canActivate: [AuthGuard] // Proteger - requiere autenticación
      },
      {
        path: 'dashboard-live',
        loadChildren: () => import('./dashboard-live/dashboard-live.module').then((m) => m.DashboardLiveModule),
        // canActivate: [AuthGuard] 
      },
      {
        path: 'live',
        loadChildren: () => import('./lives/lives.module').then((m) => m.LivesModule)
      },
      {
        path: 'live-category',
        loadChildren: () => import('./lives-category/lives-category.module').then((m) => m.LivesCategoryModule)
      },
      {
        path: 'product-detail',
        loadChildren: () => import('./product-details/product-details.module').then((m) => m.ProductDetailsModule)
      },
      {
        path: 'choose-role',
        loadChildren: () => import('./choose-role/choose-role.module').then((m) => m.ChooseRoleModule),
        canActivate: [AuthGuard] // Proteger - requiere autenticación
      },
      {
        path: 'all-department',
        loadChildren: () => import('./all-department/all-department.module').then((m) => m.AllDepartmentModule)
      },
      {
        path: 'buy-prod',
        loadChildren: () => import('./buy-prod/buy-prod.module').then((m) => m.BuyProdModule),
        canActivate: [AuthGuard] // Proteger - requiere autenticación

      },
      {
        path: 'envios-info',
        loadChildren: () => import('./envios-info/envios-info.module').then((m) => m.EnviosInfoModule)
      },
      {
        path:'prod-mas-vendidos',
        loadChildren: () => import('./best-selling-prod/best-selling-prod.module').then((m) => m.BestSellingProdModule)
      },
      {
        path: 'api-testing',
        loadChildren: () => import('./components/api-testing/api-testing.module').then((m) => m.ApiTestingModule)
      }
    ],
  },
  {
    path: 'confirm-verification', component:CodeverifComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
