import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-channel-new-message',
  templateUrl: './channel-new-message.component.html',
  styleUrls: ['./channel-new-message.component.scss'],
})
export class ChannelNewMessageComponent implements OnInit, OnChanges {

  @Input() channelName = '';
  nextMessageId = 0;

  constructor(private firestore: AngularFirestore) { }

  ngOnChanges(): void {
    this.firestore.collection('group1-messages').doc(`${this.channelName}-status`).get().pipe(take(1)).subscribe((status: any) => {
      let data = status.data();
      this.nextMessageId = data.nextMessageId;
    });
  }

  ngOnInit(): void {
    // this.firestore.collection('group1-messages').doc(`${this.channelName}-messages`).set( { [this.nextMessageId]: { author: 'Admin', message: `Welcome to ${this.channelName}` } });
    // this.nextMessageId = 1;
    // this.firestore.collection('group1-messages').doc(`${this.channelName}-status`).set( { nextMessageId: this.nextMessageId } );
  }

  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      let newMessage = myForm.value.message;
      this.firestore.collection('group1-messages').doc(`${this.channelName}-messages`).update({ [this.nextMessageId]: { author: 'Oliver', message: newMessage } });
      this.nextMessageId++;
      this.firestore.collection('group1-messages').doc(`${this.channelName}-status`).update({ nextMessageId: this.nextMessageId });
      myForm.resetForm();
    }
  }
}
