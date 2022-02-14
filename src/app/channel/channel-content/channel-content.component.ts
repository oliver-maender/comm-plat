import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/shared/messages.service';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss']
})
export class ChannelContentComponent implements OnInit, OnChanges {

  @Input() channelName = '';
  isReplying = -1;

  messages: Array<{ author: string, message: string, responses?: Array<{ author: string, message: string }>, format?: boolean }> = [];

  // userSubscription!: Subscription;
  authStateSubscription!: Subscription;
  channelMessageSubscription!: Subscription;

  constructor(private messagesService: MessagesService, private authService: AuthService, private auth: AngularFireAuth) { }


  ngOnInit(): void { }

  /**
   * It unsubscribes if already subscribed to and subscribes again (when switching a channel so it subscribes to the right channel).
   *
   * @param {SimpleChanges} changes - A hashtable of changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.messages = [];
    this.isReplying = -1;
    // if (this.channelMessageSubscription) {
    //   this.channelMessageSubscription.unsubscribe();
    // }
    // if (this.userSubscription) {
    //   this.userSubscription.unsubscribe();
    // }
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }

    // this.userSubscription = this.authService.user.subscribe((user) => {
      this.authStateSubscription = this.auth.authState.subscribe((user) => {
        if (this.channelMessageSubscription) {
          this.channelMessageSubscription.unsubscribe();
        }
        if (user) {
          this.channelMessageSubscription = this.messagesService.getMessages(this.channelName).subscribe((messages: any) => {
            this.messages = messages;
          });
        }
      });
    // });
  }

  /**
   * Closes the textfield and sets the replying indicator to negative.
   *
   * @param event
   */
  closeTextfield() {
    this.isReplying = -1;
  }

}
