import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwipeNavigationModule } from 'node_modules/swipe-navigation'
import { MainViewModule } from './mainModule/main-view-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './otherPages/login/login.component';
import { SignupComponent } from './otherPages/signup/signup.component';
import { RedirectPageComponent } from './otherPages/redirect-page/redirect-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RedirectPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    MainViewModule,
    AppRoutingModule,
    SwipeNavigationModule,
    HammerModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
