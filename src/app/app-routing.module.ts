import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { GuestComponent } from './shared/layouts/guest/guest.component';
import { LoggedComponent } from './shared/layouts/logged/logged.component';

import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { ResetComponent } from './guest/reset/reset.component';

import { HomeComponent } from './logged/home/home.component';
import { UserIndexComponent } from './logged/users/index/index.component';

const routes: Routes = [
  {
    path: 'logged',
    //canActivate: [ApiGuard],
    component: LoggedComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserIndexComponent },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'reset',
        component: ResetComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'logout',
        redirectTo: 'login',
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'logged/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
