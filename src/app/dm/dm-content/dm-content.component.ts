import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/shared/messages.service';

@Component({
  selector: 'app-dm-content',
  templateUrl: './dm-content.component.html',
  styleUrls: ['./dm-content.component.scss']
})
export class DmContentComponent implements OnInit, OnChanges, OnDestroy {

  @Input() recipientName = '';

  messages: Array<{ author: string, message: string }> = [];

  // userSubscription!: Subscription;
  authStateSubscription!: Subscription;
  channelMessageSubscription!: Subscription;

  constructor(private messagesService: MessagesService, private authService: AuthService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  /**
  * It unsubscribes if already subscribed to and subscribes again (when switching a channel so it subscribes to the right channel).
  *
  * @param {SimpleChanges} changes - A hashtable of changes
  */
  ngOnChanges(changes: SimpleChanges): void {
    this.messages = [];
    if (this.channelMessageSubscription) {
      this.channelMessageSubscription.unsubscribe();
    }
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
          this.channelMessageSubscription = this.messagesService.getDirectMessages(this.recipientName).subscribe((messages: any) => {
            this.messages = messages;
          });
        }
      });
    // });
  }

  ngOnDestroy(): void {
    this.channelMessageSubscription.unsubscribe();
  }

}
