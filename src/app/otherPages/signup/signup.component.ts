import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/services/ajax-service.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { ServerUrl } from 'src/environments/environment.development';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private location: Location, private formBuilder: FormBuilder, private ajaxService: AjaxService, private toast: ToastService, private router: Router) { };

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      age: [0],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  signUp() {
    let url = ServerUrl.url + '/createUser';
    this.ajaxService.ajaxPost(url, this.signupForm.value).subscribe(res => {
      if (res.message == "You are signed Up!") {
        this.router.navigateByUrl('/login')
        this.toast.showToast(res.message + ", Please login using this portal");
      }
      else {
        this.toast.showToast(res.message);
      }
    })
  }
}
