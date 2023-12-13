import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.scss']
})
export class RedirectPageComponent implements OnInit {

  constructor(private route: Router) { }
  ngOnInit(): void {
    setTimeout(() => {
      if (localStorage['userDetails']) {
        this.route.navigateByUrl('main');
      } else {
        this.route.navigateByUrl('login');
      }
    }, 2000)
  }
}
