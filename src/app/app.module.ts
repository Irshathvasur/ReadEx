import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { CameraModule } from './cameraModule/camera/camera.module';
import { SwipeNavigationModule } from 'node_modules/swipe-navigation';
import { PosterComponent } from './cameraModule/poster/poster.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AvatarModule } from 'primeng/avatar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { OrderListModule } from 'primeng/orderlist';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RedirectPageComponent,
    PosterComponent,
  ],
  imports: [
    CommonModule,
    SwipeNavigationModule,
    ImageCropperModule,
    HttpClientModule,
    BrowserModule,
    MainViewModule,
    DynamicDialogModule,
    AppRoutingModule,
    AvatarModule,
    HammerModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    OrderListModule,
    ReactiveFormsModule,
    CameraModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
})
export class AppModule { }
