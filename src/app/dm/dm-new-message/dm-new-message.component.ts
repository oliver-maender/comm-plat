import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dm-new-message',
  templateUrl: './dm-new-message.component.html',
  styleUrls: ['./dm-new-message.component.scss']
})
export class DmNewMessageComponent implements OnInit {

  @Input() recipientName = '';
  nextMessageId = 0;

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Manages the sending direct messages routine when the user sends a new message.
   *
   * @param {NgForm} myForm - The submitted form
   */
  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-status`).get().pipe(take(1)).subscribe((status: any) => {
        let data = status.data();
        let newMessage = myForm.value.message;
        let userEmail = this.authService.userEmail;
        if (data) {
          this.nextMessageId = data.nextMessageId;
          this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-messages`).update({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
          this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-messages`).update({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
          this.nextMessageId++;
          this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-status`).update({ nextMessageId: this.nextMessageId });
          this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-status`).update({ nextMessageId: this.nextMessageId });
        } else {
          this.nextMessageId = 0;
          this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-messages`).set({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
          this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-messages`).set({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
          this.nextMessageId++;
          this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-status`).set({ nextMessageId: this.nextMessageId });
          this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-status`).set({ nextMessageId: this.nextMessageId });
        }
        myForm.resetForm();
      });
    }
  }

}
