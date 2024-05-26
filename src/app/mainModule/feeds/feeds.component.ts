import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/services/ajax-service.service';
import { ServerUrl } from 'src/environments/environment';

@Component({
  selector: 'feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  posts;
  constructor(private ajaxService: AjaxService, public route: Router) {

  }
  ngOnInit(): void {
    let url = ServerUrl.url + "/getNewPosts";
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.posts = res;
    })
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();
  }

  logout() {
    localStorage.clear();
    this.route.navigateByUrl('login');
  }
}
