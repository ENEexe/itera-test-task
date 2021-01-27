import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message } from './shared/message';
import { ChatData } from './shared/chat-data';
import { isEmptyNullOrUndefined } from './shared/value-checking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  friendList: string[] = ["Alex", "Sam", "Bob"]
  userName: string = "";
  chatRoom: string = ""
  friendSelected: boolean = false
  messageHistory: Message[] = []
  chatData: ChatData[] = []

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<ChatData[]>("../../assets/chat.json").subscribe((data) => {
      this.chatData = data
    })
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges()
  }

  loadChat(friend: string) {
    if (!isEmptyNullOrUndefined(this.userName)) {
      this.messageHistory = []
      this.chatRoom = friend
      this.friendSelected = true

      let key = this.userName + this.chatRoom + 'Messages'
      let messageHistory = window.localStorage.getItem(key)

      if (messageHistory) {
        let parsed: Message[] = JSON.parse(messageHistory);
        this.messageHistory = parsed
      } else if (this.chatData && this.chatData.length > 0) {
        for (let chatItem of this.chatData) {
          if (chatItem.key === key) {
            this.messageHistory = chatItem.messages
            window.localStorage.setItem(key, JSON.stringify(this.messageHistory))
            return
          }
        }
      }
    }
  }

  setUserName(name: string) {
    this.userName = name
  }
}
