import { AfterViewInit, Component, ElementRef, PlatformRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { DataTransponderService } from 'src/app/services/data-transponder.service';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
  webcamImage: WebcamImage;
  width = window.innerWidth;
  height = window.innerHeight;
  private trigger: Subject<void> = new Subject<void>();
  constructor(private dataTransfer: DataTransponderService, private router: Router) { }
  public handleImage(webcamImage: WebcamImage): void {

    this.dataTransfer.storeData(webcamImage);
    this.router.navigateByUrl('poster');
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
