import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dm-new-message',
  templateUrl: './dm-new-message.component.html',
  styleUrls: ['./dm-new-message.component.scss']
})
export class DmNewMessageComponent implements OnInit {

  @Input() recipientName = '';
  nextMessageId = 0;

  constructor(private firestore: AngularFirestore, private authService: AuthService, private dataService: DataService) { }

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
          this.updateNewMessage(data, userEmail, newMessage);
        } else {
          this.setNewMessage(userEmail, newMessage);
        }
        myForm.resetForm();
      });
    }
  }

  /**
   * Updates the database with the new dm.
   *
   * @param {any} data - The data containing the nextMessageId
   * @param {string} userEmail - The current user's email address
   * @param {string} newMessage - The message to be added
   */
  updateNewMessage(data, userEmail: string, newMessage: string) {
    this.nextMessageId = data.nextMessageId;
    this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-messages`).update({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
    this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-messages`).update({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
    this.nextMessageId++;
    this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-status`).update({ nextMessageId: this.nextMessageId });
    this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-status`).update({ nextMessageId: this.nextMessageId }).then(() => {
      this.dataService.refreshContactedUsers(this.recipientName);
    });
  }

  /**
   * Creates a new database collection and updates it with the new dm (if the two users never contacted each other before).
   *
   * @param {string} userEmail - The current user's email address
   * @param {string} newMessage - The message to be added
   */
  setNewMessage(userEmail: string, newMessage: string) {
    this.nextMessageId = 0;
    this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-messages`).set({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
    this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-messages`).set({ [this.nextMessageId]: { author: `${userEmail}`, message: newMessage } });
    this.nextMessageId++;
    this.firestore.collection(`user-${this.authService.userId}`).doc(`recipient-${this.recipientName}-status`).set({ nextMessageId: this.nextMessageId });
    this.firestore.collection(`user-${this.recipientName}`).doc(`recipient-${this.authService.userId}-status`).set({ nextMessageId: this.nextMessageId });
    this.preprocessUpdateNewContact();
  }

  /**
   * Gets the nextRecipientId for the new contact.
   */
  preprocessUpdateNewContact() {
    this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-status').get().pipe(take(1)).subscribe((id: any) => {
      let idData = id.data();
      let nextRecipientId = idData.nextRecipientId;
      this.updateNewContact(nextRecipientId);
    });
  }

  /**
   * Adds the new contact to the user's database document.
   *
   * @param {number} nextRecipientId - The Id for the next contact
   */
  updateNewContact(nextRecipientId: number) {
    this.firestore.collection(`user-${this.recipientName}`).doc('info').get().pipe(take(1)).subscribe((resEmail: any) => {
      let resEmailData = resEmail.data();
      let email = resEmailData.email;
      this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-names').update({ [nextRecipientId]: { email: email, id: this.recipientName } });
      nextRecipientId++;
      this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-status').update({ nextRecipientId: nextRecipientId }).then(() => {
        if (this.recipientName != this.authService.userId) {
          this.updateRecipientStatus();
        } else {
          this.dataService.refreshContactedUsers(this.recipientName);
        }
      });
    });
  }

  /**
   * Updates the status for the recipient's database document.
   */
  updateRecipientStatus() {
    this.firestore.collection(`user-${this.recipientName}`).doc('recipients-status').get().pipe(take(1)).subscribe((idRec: any) => {
      let idRecData = idRec.data();
      let nextRecRecipientId = idRecData.nextRecipientId;
      this.firestore.collection(`user-${this.recipientName}`).doc('recipients-names').update({ [nextRecRecipientId]: { email: this.authService.userEmail, id: this.authService.userId } });
      nextRecRecipientId++;
      this.firestore.collection(`user-${this.recipientName}`).doc('recipients-status').update({ nextRecipientId: nextRecRecipientId }).then(() => {
        this.dataService.refreshContactedUsers(this.recipientName);
      });
      // this.dataService.updateContactedUserArray();
    });
  }

}
