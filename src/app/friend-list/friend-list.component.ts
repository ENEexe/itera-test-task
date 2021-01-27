import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEmptyNullOrUndefined } from '../shared/value-checking';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  @Input() friendName: string = "";
  @Input() user: string = ""
  @Output() onFriendSelected = new EventEmitter()

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loadChatHistory(friend: string) {
    if (!isEmptyNullOrUndefined(this.user)) {
      this.onFriendSelected.emit(friend)
    } else {
      let errorMessage = "Please enter user name before selecting a chat room"
      this.snackBar.open(errorMessage, "Close", {
        duration: 2000
      })
    }
  }

}
