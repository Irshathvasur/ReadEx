import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatdataserviceService {
  chatHistory: any = {};
  constructor() { }

  storeChat(chat, username) {
    this.chatHistory[username] = chat;
  }

  getChat(username) {
    if (username in this.chatHistory)
      return this.chatHistory[username];
    else {
      return [];
    }
  }
}
