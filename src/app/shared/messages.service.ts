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
   * Gets the messages of the selected channel from firestore.
   *
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

  /**
   * Gets the messages which have been written to and from the selected contact.
   *
   * @param recipientName - The recipient's name
   * @returns the messages
   */
  getDirectMessages(recipientName: string) {
    return this.authService.user.pipe(take(1), exhaustMap((user) => {
      return this.firestore.collection(`user-${user.id}`).doc(`recipient-${recipientName}-messages`).valueChanges();
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

  /**
   * Adds a new response to an existing message in a channel.
   *
   * @param index - The index of the existing message in the channel
   * @param channel - The channel the response is going to be added to
   * @param nextAuthor - The author of the new response
   * @param nextMessage - The content of the new response
   */
  updateMessage(index: number, channel: string, nextAuthor: string, nextMessage: string) {
    this.firestore.collection('group1-messages').doc(`${channel}-messages`).get().pipe(take(1)).subscribe((res: any) => {
      let messages = res.data();
      let message = messages[index];
      console.log(message);
      let responses = [];
      if (message.responses) {
        for (let i = 0; i < Object.keys(message.responses).length; i++) {
          const element = message.responses[i];
          responses.push(element);
        }
      }
      responses.push({ author: nextAuthor, message: nextMessage });
      this.firestore.collection('group1-messages').doc(`${channel}-messages`).update({ [index]: { author: message.author, message: message.message, responses: responses } });
    });
  }
}
