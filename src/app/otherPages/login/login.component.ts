import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/services/ajax-service.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { ServerUrl } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm
  url = ServerUrl.url
  constructor(private route: Router, private ajaxService: AjaxService, private formBuilder: FormBuilder, private router: Router, private toastService: ToastService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  goToSignup() {
    this.route.navigateByUrl('signup');
    // this.route.navigateByUrl('main');
  }

  login() {
    let url = ServerUrl.url + '/validateUserCredentials';
    let body = this.loginForm.value;
    this.ajaxService.ajaxPost(url, body).subscribe(res => {
      if (res.message == "invalid Credentials") {
        this.toastService.showToast(res.message + ", Try again!");
      } else {
        localStorage.setItem('userDetails', JSON.stringify(res));
        this.router.navigateByUrl('/main');
      }
    })
  }
}
