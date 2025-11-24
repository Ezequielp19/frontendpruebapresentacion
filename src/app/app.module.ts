import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';




//modulo TOAST(ALERTAS)
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';




//---------------

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharedModule } from './shared/shared.module';
import { IconsModule } from './icons/icons.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VehicleFilterComponent } from './vehicle-filter/vehicle-filter.component';
import {MatDividerModule} from '@angular/material/divider';
import { TranslateLoader,TranslateModule,TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



// export function httpTranslateLoader(http:HttpClient): TranslateHttpLoader{
//   return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [AppComponent, LayoutComponent, VehicleFilterComponent],
  imports:
  [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    IconsModule,
    BrowserAnimationsModule,
    RouterModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatExpansionModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

