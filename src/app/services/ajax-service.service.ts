import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

const httpOptionsWithJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8',
  }),
  // withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  private extractStringData(res: any) {
    const body = res;
    return body || 'jk';
  }

  async toast() {
    console.log('Something went wrong');
  }
  constructor(private http: HttpClient) { }

  ajaxGet(url: string): Observable<any> {
    return this.http.get(url).pipe(map(this.extractStringData), catchError(this.toast));
  }

  ajaxPost(url: string, body: any): Observable<any> {
    return this.http.post(url, body,

    ).pipe(map(this.extractStringData), catchError(this.toast));
  }

}
