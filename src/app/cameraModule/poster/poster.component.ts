import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTransponderService } from 'src/app/services/data-transponder.service';
import { Location } from '@angular/common';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { AjaxService } from 'src/app/services/ajax-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerUrl } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
  image;
  croppedImage: any;
  private searchSubject = new Subject<string>();
  postForm: FormGroup;
  @ViewChild('loader') loader: ElementRef;
  loading: boolean = true;
  constructor(private dataTransfer: DataTransponderService, private location: Location,
    private sanitizer: DomSanitizer, private ajaxService: AjaxService,
    private formBuilder: FormBuilder, private toast: ToastService, private router: Router) { }
  ngOnInit(): void {
    this.image = this.dataTransfer.getData();
    this.postForm = this.formBuilder.group({
      id: [null],
      title: [''],
      author: [''],
      genre: [''],
      coverid: [null],
      image: [''],
      status: [true],
      userid: [parseInt(JSON.parse(localStorage.getItem("userDetails")).id)]
    })
    this.searchSubject
      .pipe(
        debounceTime(500), // 300 milliseconds delay
        switchMap((query) => this.searchAfterDebounce(query))
      )
      .subscribe((result) => {
        this.loader.nativeElement.style.display = "none";
        if (result.numFound > 0) {
          let genres = result.docs[0].subject_facet ? result.docs[0].subject_facet[0] + ', ' + result.docs[0].subject_facet[1] : '';
          this.postForm.patchValue({
            title: result.docs[0].title,
            author: result.docs[0].author_name[0],
            genre: genres,
            coverid: result.docs[0].cover_i.toString(),
          })
        } else {
          this.postForm.patchValue({
            title: '',
            author: '',
            genre: '',
            coverid: '',
          })
        }
      });
  }

  searchChanged(event) {
    this.searchSubject.next(event.target.value);
  }

  searchAfterDebounce(query: string) {
    this.loader.nativeElement.style.display = "block";
    query = query.replace(/ /g, "+")
    let url = "https://openlibrary.org/search.json?q=" + query + "&page=1";
    return this.ajaxService.ajaxGet(url);
  }

  goBack() {
    this.location.back();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.base64);
  }

  post() {
    this.postForm.patchValue({
      image: this.croppedImage.changingThisBreaksApplicationSecurity,
      status: true
    })

    let url = ServerUrl.url;
    this.ajaxService.ajaxPost(url + "/uploadPost", this.postForm.value).subscribe(res => {
      if (res.message == "Your post is Uploaded!") {
        this.toast.showToast(res.message);
        this.router.navigateByUrl('main')
      }
    });
  }

  onImageLoad(): void {
    this.loading = false; // Once image is loaded, hide the loader
  }
}
