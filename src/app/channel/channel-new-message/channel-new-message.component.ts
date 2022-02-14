import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-channel-new-message',
  templateUrl: './channel-new-message.component.html',
  styleUrls: ['./channel-new-message.component.scss'],
})
export class ChannelNewMessageComponent implements OnInit {

  @Input() channelName = '';
  nextMessageId = 0;

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  ngOnInit(): void {
    // this.firestore.collection('group1-messages').doc(`${this.channelName}-messages`).set( { [this.nextMessageId]: { author: 'Admin', message: `Welcome to ${this.channelName}` } });
    // this.nextMessageId = 1;
    // this.firestore.collection('group1-messages').doc(`${this.channelName}-status`).set( { nextMessageId: this.nextMessageId } );
  }

   /**
   * Manages the sending message to channel routine when the user sends a new message.
   *
   * @param {NgForm} myForm - The submitted form
   */
  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      this.firestore.collection('group1-messages').doc(`${this.channelName}-status`).get().pipe(take(1)).subscribe((status: any) => {
        let data = status.data();
        this.nextMessageId = data.nextMessageId;
        let newMessage = myForm.value.message;
        let userEmail = this.authService.userEmail;
        this.firestore.collection('group1-messages').doc(`${this.channelName}-messages`).update({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
        this.nextMessageId++;
        this.firestore.collection('group1-messages').doc(`${this.channelName}-status`).update({ nextMessageId: this.nextMessageId });
        myForm.resetForm();
      });
    }
  }
}
