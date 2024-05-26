import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { WebcamModule } from 'ngx-webcam';



@NgModule({
  declarations: [
    CameraComponent
  ],
  exports: [
    CameraComponent
  ],
  imports: [
    CommonModule,
    WebcamModule
  ]
})
export class CameraModule { }
