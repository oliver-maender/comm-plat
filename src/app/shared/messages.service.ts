import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Array<{ author: string, message: string }> = [];

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  /**
   * Gets the messages of the selected channel from firestore
   * @param {string} channelName - The name of the channel which contains the messages you want to get
   * @returns The messages in this channel
   */
  getMessages(channelName: string) {
    return this.authService.user.pipe(take(1), exhaustMap((user) => {
      return this.firestore.collection('group1-messages').doc(`${channelName}-messages`).valueChanges();
    }), map((messages: any) => {
      this.messages = [];
      for (const message in messages) {
        if (Object.prototype.hasOwnProperty.call(messages, message)) {
          const element = messages[message];
          this.messages.push(element);
        }
      }
      console.log(messages);
      console.log(this.messages);
      return this.messages;
    }));
  }
}
