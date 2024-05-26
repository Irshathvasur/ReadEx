import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequesterComponent } from '../requester/requester.component';
import { DataTransponderService } from 'src/app/services/data-transponder.service';

@Component({
  selector: 'app-postcomponent',
  templateUrl: './postcomponent.component.html',
  styleUrls: ['./postcomponent.component.scss']
})
export class PostcomponentComponent {
  @Input() data: dataFormat;
  loading: boolean = true;
  ref: DynamicDialogRef;
  userId = JSON.parse(localStorage.getItem('userDetails')).id;
  constructor(private dialog: DialogService, private dataTransfer: DataTransponderService) {

  }
  ngOnInit() {
  }

  onImageLoad(): void {
    this.loading = false; // Once image is loaded, hide the loader
  }

  show() {
    this.ref = this.dialog.open(RequesterComponent, {
      header: 'Select a book to Exchange',
      width: '90%',
      contentStyle: { overflow: 'auto', padding: '0px' },
      baseZIndex: 1000,
      style: { 'Font-family': 'Comfortaa' }
    });
    this.dataTransfer.storeData({ data: this.data, ref: this.ref, type: "Exchange" });

    // this.ref.onClose.subscribe((product: Product) => {
    //   if (product) {
    //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //   }
    // });

    // this.ref.onMaximize.subscribe((value) => {
    //   this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    // });
  }
}

interface dataFormat {
  coverid: number,
  author: string,
  genre: string,
  id: number,
  title: string,
  userid: number,
  status: boolean,
  username: string,
  image: string
}