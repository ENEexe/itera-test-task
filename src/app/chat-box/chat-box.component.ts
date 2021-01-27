import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Message } from '../shared/message';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @Input() friendSelected: boolean = false;
  @Input() chatRoom: string = ""
  @Input() messageHistory: Message[] = []
  @Output() onUserNameSet = new EventEmitter<string>()

  userName: string = ""

  ngOnInit(): void {
  }

  addMessageToChatBox(message: Message) {
    this.messageHistory.push(message)
    let key = message.user + this.chatRoom + 'Messages'
    window.localStorage.setItem(key, JSON.stringify(this.messageHistory))
  }

  setUserName(name: string) {
    this.userName = name
    this.onUserNameSet.emit(this.userName)
  }

  clearChat() {
    this.messageHistory = []
    let key = this.userName + this.chatRoom + 'Messages'
    window.localStorage.setItem(key, JSON.stringify(this.messageHistory))
  }

  setChatMsgClass(message: Message) {
    let cssClassBase: string = "chat-box__message"
    let byFriendSuffix: string = "--by-friend"

    if (message.sentByFriend) {
      return cssClassBase + " " + cssClassBase + byFriendSuffix
    } else {
      return cssClassBase
    }
  }
}
