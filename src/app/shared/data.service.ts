import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  changeContactedUser = new Subject<string>();
  // changeContactedUserArray = new Subject<any>();

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  /**
  * Returns the list of all users.
  *
  * @returns The list of all users
  */
  showUserList() {
    return this.firestore.collection('users').doc('list').get().pipe(take(1), map((userList) => {
      return userList.data();
    }));
  }

  // showContactedUserList() {
  //   return this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-names').get().pipe(take(1), map((users) => {
  //     return users.data();
  //   }));
  // }

  // updateContactedUserArray() {
  //   this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-names').get().pipe(take(1)).subscribe((users) => {
  //     let usersData = users.data();
  //     this.changeContactedUserArray.next(usersData);
  //   });
  // }

  /**
   * Returns the list of all contacted users.
   *
   * @returns The list of all contacted users
   */
  listenToContactedUsersArray() {
    return this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-names').valueChanges().pipe(map((userList) => {
      return userList;
    }))
  }

  /**
   * Updates the list of all contacted users.
   *
   * @param {any} users - The list of all contacted users.
   */
  updateDatabaseRecipients(users: any) {
    this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-names').set({ ...users });
  }

  /**
   * Updates the recipient's recipient document so that the list of all contacted users is always sorted from most recently contacted to least.
   *
   * @param {string} userId - The user's Id
   * @param {string} recId - The recipient's Id
   */
  updateDatabaseRecipientRecipients(userId: string, recId: string) {
    this.firestore.collection(`user-${userId}`).doc('recipients-names').get().pipe(take(1)).subscribe((userList: any) => {
      let userData = userList.data();
      let userDataArray = [];
      for (let i = 0; i < Object.keys(userData).length; i++) {
        const element = userData[i];
        userDataArray.push(element);
      }
      console.log(userDataArray);
      console.log(userData);
      let fromIndex = userDataArray.findIndex(recToR => recToR['id'] === recId);
      if (fromIndex > -1) {
        let element = userDataArray[fromIndex];
        userDataArray.splice(fromIndex, 1);
        userDataArray.splice(0, 0, element);
      }
      this.firestore.collection(`user-${userId}`).doc('recipients-names').set({ ...userDataArray });
    });
  }

  // updateContactedUserList(userId: string) {
  //   let userEmail = '';
  //   this.firestore.collection(`user-${userId}`).doc('info').get().pipe(take(1)).subscribe((email: any) => {
  //     let data = email.data();
  //     userEmail = data.email;
  //     this.firestore.collection(`user-${this.authService.userId}`).doc('recipients-names').update({ id: userId, email: userEmail });
  //   });
  // }

  /**
   * Triggers when a user is contacted and so the list needs to be reordered, so that the most recently contacted user is always on top.
   *
   * @param userId - The user's Id
   */
  refreshContactedUsers(userId: string) {
    this.changeContactedUser.next(userId);
  }

}
