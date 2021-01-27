import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEmptyNullOrUndefined } from 'src/app/shared/value-checking';
import { Message } from '../../shared/message';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  @Input() friendSelected: boolean = false;
  @Output() onMessageSent = new EventEmitter<Message>()
  @Output() onUserNameSet = new EventEmitter<string>()

  userName: string = ""
  message: string = ""

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let storedUserName = window.localStorage.getItem("currentUser")
    if (storedUserName) {
      this.userName = storedUserName
      this.setUserName(this.userName)
    }
  }

  sendMessageOnEnterPress(user: string, message: string, event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.sendMessage(user, message)
    }
  }

  sendMessage(user: string, message: string) {
    if (!isEmptyNullOrUndefined(user) && this.friendSelected) {
      if (!isEmptyNullOrUndefined(message)) {
        let newMessage: Message = {
          user,
          message,
          sentByFriend: false
        }
        this.onMessageSent.emit(newMessage)
        this.message = ""
      }
    } else {
      let errorMessage = "Please enter user name and/or select a chat room"
      this.snackBar.open(errorMessage, "Close", {
        duration: 2000
      })
    }
  }

  setUserName(name: string) {
    if (!isEmptyNullOrUndefined(name)) {
      window.localStorage.setItem("currentUser", name)
      this.onUserNameSet.emit(name)
    }
  }
}
