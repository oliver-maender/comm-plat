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

  messages: Array<{ author: string, message: string }> = [];

  userSubscription!: Subscription;
  authStateSubscription!: Subscription;
  channelMessageSubscription!: Subscription;

  constructor(private messagesService: MessagesService, private authService: AuthService, private auth: AngularFireAuth) { }

  /**
   * It unsubscribes if already subscribed to and subscribes again (when switching a channel so it subscribes to the right channel).
   *
   * @param {SimpleChanges} changes - A hashtable of changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change', changes);
    if (this.channelMessageSubscription) {
      this.channelMessageSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }

    this.userSubscription = this.authService.user.subscribe((user) => {
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.channelMessageSubscription = this.messagesService.getMessages(this.channelName).subscribe((messages: any) => {
            this.messages = messages;
          });
        }
      });
    });
  }

  ngOnInit(): void { }

}
