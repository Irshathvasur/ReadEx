import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './otherPages/login/login.component';
import { SignupComponent } from './otherPages/signup/signup.component';
import { RedirectPageComponent } from './otherPages/redirect-page/redirect-page.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectPageComponent,
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/mainModule/main-view-module.module').then((m) => m.MainViewModule),
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
