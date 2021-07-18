import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { httpInterceptorProviders } from './shared/interceptors/index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { GuestComponent } from './shared/layouts/guest/guest.component';
import { LoggedComponent } from './shared/layouts/logged/logged.component';
import { ResetComponent } from './guest/reset/reset.component';
import { RegisterComponent } from './guest/register/register.component';
import { LoginComponent } from './guest/login/login.component';
import { UserIndexComponent } from './logged/users/index/index.component';
import { HomeComponent } from './logged/home/home.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    GuestComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,

    LoggedComponent,
    HomeComponent,
    UserIndexComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              httpInterceptorProviders
             ],
  bootstrap: [AppComponent],
})

export class AppModule {}
