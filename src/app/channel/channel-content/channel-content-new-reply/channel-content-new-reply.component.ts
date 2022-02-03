import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/shared/messages.service';

@Component({
  selector: 'app-channel-content-new-reply',
  templateUrl: './channel-content-new-reply.component.html',
  styleUrls: ['./channel-content-new-reply.component.scss']
})
export class ChannelContentNewReplyComponent implements OnInit {

  @Input() index = -1;
  @Input() channelName = '';

  @Output() closeTextfield = new EventEmitter<boolean>();

  constructor(private messagesService: MessagesService, private authService: AuthService) { }

  ngOnInit(): void { }

  /**
  * Manages the sending message to channel routine when the user sends a new message.
  *
  * @param {NgForm} myForm - The submitted form
  */
  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      this.messagesService.updateMessage(this.index, this.channelName, this.authService.userEmail, myForm.value.message);
      this.closeTextfield.emit(true);
    }
  }

}
