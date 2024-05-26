import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { AjaxService } from 'src/app/services/ajax-service.service';
import { ServerUrl } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private location: Location, private ajaxService: AjaxService) { };
  Genre: any;
  SelectedGenre: any;
  Posts: any;
  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    let url = ServerUrl.url + "/getAllTypesGenre";
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.Genre = res;
    })
  }

  getPosts(event) {

    let url = ServerUrl.url + "/getPostsByGenre";
    this.ajaxService.ajaxPost(url, { genre: event.value.name }).subscribe(res => {
      this.Posts = res;
    })
  }

  goBack() {
    this.location.back();
  }
}
