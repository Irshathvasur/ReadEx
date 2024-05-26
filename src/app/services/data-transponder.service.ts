import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransponderService {
  data: any;
  constructor() { }

  storeData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
