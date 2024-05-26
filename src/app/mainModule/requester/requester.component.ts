import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AjaxService } from 'src/app/services/ajax-service.service';
import { DataTransponderService } from 'src/app/services/data-transponder.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { ServerUrl } from 'src/environments/environment';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.scss']
})
export class RequesterComponent {
  posts;
  loading: boolean = true;
  selectedPost;
  receiverUser;
  ref: DynamicDialogRef;
  constructor(private ajaxService: AjaxService, private toast: ToastService,
    public dataTransfer: DataTransponderService, private dialog: DialogService) { }

  ngOnInit() {
    let url = ServerUrl.url + "/getPostsOfUser";
    let body = {
      userId: JSON.parse(localStorage.getItem("userDetails")).id.toString()
    }
    this.ajaxService.ajaxPost(url, body).subscribe(res => {
      console.log(res);
      this.posts = res;
    })
  }

  onImageLoad(): void {
    this.loading = false; // Once image is loaded, hide the loader
  }

  exchange() {
    this.ref = this.dataTransfer.getData().ref;
    if (this.dataTransfer.getData().type == "Exchange") {
      this.receiverUser = this.dataTransfer.getData().data;
      let user = JSON.parse(localStorage.getItem('userDetails'));
      let url = ServerUrl.url + "/sendRequest";
      console.log(this.receiverUser)
      let body = {
        id: null,
        sender: user.username,
        receiver: this.receiverUser.username,
        senderId: user.id,
        receiverId: Number(this.receiverUser.userid),
        offeredBook: this.selectedPost.id,
        postId: this.receiverUser.id,
      }
      this.ajaxService.ajaxPost(url, body).subscribe(res => {
        this.toast.showToast(res.message);
        if (res.message == "Your Request is Sent!") {
          this.ref.close();
        }
      })
    } else {
      if (this.selectedPost)
        this.ref.close(this.selectedPost)
      else
        this.ref.close();
    }
  }
}
