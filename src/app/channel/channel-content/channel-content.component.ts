import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss']
})
export class ChannelContentComponent implements OnInit, OnChanges {

  @Input() channelName = '';

  messages: Array<{ author: string, message: string }> = [];

  channelMessageSubscriptions!: Subscription;

  constructor(private firestore: AngularFirestore) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change', changes);
    if (this.channelMessageSubscriptions) {
      this.channelMessageSubscriptions.unsubscribe();
    }
    this.getMessages();
  }

  ngOnInit(): void { }

  getMessages() {
    this.channelMessageSubscriptions = this.firestore.collection('group1-messages').doc(`${this.channelName}-messages`).valueChanges().subscribe((messages: any) => {
      this.messages = [];
      for (const message in messages) {
        if (Object.prototype.hasOwnProperty.call(messages, message)) {
          const element = messages[message];
          this.messages.push(element);
        }
      }
      console.log(messages);
      console.log(this.messages);
    });
  }
}
