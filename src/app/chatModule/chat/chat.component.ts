import { Component, HostListener } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequesterComponent } from 'src/app/mainModule/requester/requester.component';
import { AjaxService } from 'src/app/services/ajax-service.service';
import { ChatdataserviceService } from 'src/app/services/chatdataservice.service';
import { DataTransponderService } from 'src/app/services/data-transponder.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { ServerUrl } from 'src/environments/environment';
declare var SockJS;
declare var Stomp;


@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  requests;
  username = JSON.parse(localStorage.getItem('userDetails')).username;
  chatingUser;
  inChat = false;
  message;
  messages = [];
  loading: boolean = true;
  ref: DynamicDialogRef;
  showcaseBook;
  constructor(private ajaxService: AjaxService, private dialog: DialogService, private dataTransfer: DataTransponderService, private history: ChatdataserviceService, private toast: ToastService) {
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();
  }

  ngOnInit() {
    let url = ServerUrl.url + "/getActiveRequests?id=" + JSON.parse(localStorage.getItem("userDetails")).id;
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.requests = res;
    })
    this.initializeWebSocketConnection()
  }

  public stompClient;
  public msg = [];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8099/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    let username = this.username;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/user/' + username + '/private', (message) => {
        if (message) {
          that.msg.push(message);
          console.log(JSON.parse(message.body).date);
          if (JSON.parse(message.body).date == "offer") {
            that.showcaseBook = JSON.parse(JSON.parse(message.body).message)
            console.log(that.showcaseBook);
          } else {
            that.messages.push({ content: JSON.parse(message.body).message, sent: false })
            console.log(that.showcaseBook);
          }
          console.log(that.showcaseBook);
        }
      });
    });
  }

  goToChat(req) {
    let url = ServerUrl.url + "/sendRequest";
    let body = {
      id: null,
      sender: req.receiverName,
      receiver: req.senderName,
      senderId: req.receiverId,
      receiverId: req.senderId,
      offeredBook: req.postid.id,
      postId: req.offeredBook.id,
    }
    this.ajaxService.ajaxPost(url, body).subscribe(res => {
    })
    this.chatingUser = req;
    if (this.history.getChat(this.username).length > 0) {
      this.messages = this.history.getChat(this.username);
    }
    this.inChat = true;
  }


  goBack() {
    this.chatingUser = null;
    this.history.storeChat(this.messages, this.username);
    this.inChat = false;
  }

  sendMessage() {
    this.messages.push({ content: this.message, sent: true })
    let messagebody = {
      receiverName: this.chatingUser.senderName,
      message: this.message,
      senderName: this.username,
      date: "chat"
    }
    this.stompClient.send('/readEx/private-message', {}, JSON.stringify(messagebody));
    this.message = null;
  }

  onImageLoad(): void {
    this.loading = false;
  }

  openBooks() {
    this.ref = this.dialog.open(RequesterComponent, {
      header: 'Select a book to Exchange',
      width: '90%',
      contentStyle: { overflow: 'auto', padding: '0px' },
      baseZIndex: 1000,
      style: { 'Font-family': 'Comfortaa' }
    });
    this.dataTransfer.storeData({ data: this.chatingUser, ref: this.ref, type: "Offer" });
    this.ref.onClose.subscribe(res => {
      console.log(res);
      let messagebody = {
        receiverName: this.chatingUser.senderName,
        message: JSON.stringify({ coverid: res.coverid, title: res.title, author: res.author, genre: res.genre }),
        senderName: this.username,
        date: "offer"
      }
      this.stompClient.send('/readEx/private-message', {}, JSON.stringify(messagebody));
    })
  }

}
