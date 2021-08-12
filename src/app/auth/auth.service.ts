import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

// interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  private userData: User;

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private router: Router) { }

  /**
   * Returns the currently logged in user's email address.
   *
   * @returns {string} the currently logged in user's email address
   */
  get userEmail() {
    return this.userData.email;
  }

  /**
   * Returns the currently logged in user's id.
   *
   * @returns {string} the currently logged in user's id
   */
  get userId() {
    return this.userData.id;
  }

  /**
   * Adds the user to the authentication in firebase.
   *
   * @param {string} email - The transmitted email
   * @param {string} password - The transmitted password
   * @returns The user information
   */
  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then((resData) => {
      console.log(resData);
      this.authenticationHandling(resData.user.email, resData.user.uid, '', 3600, false);
      return resData;
    }).catch((error) => {
      console.log(error);
      throw error.message;
    });

    // The following comment code is designed for the Firebase Realtime Database and does not seem to work fine with the Angular Firestore Database but is kept if something will change.

    // return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, {
    //   email: email,
    //   password: password,
    //   returnSecureToken: true
    // }).pipe(catchError(this.errorHandling), tap((resData) => {
    //   this.authenticationHandling(resData.email, resData.localId, resData.idToken, +resData.expiresIn, password);
    // }));
  }

  /**
   * Checks if the transmitted user exists and if yes starts the authentication handling or if no throws an error.
   *
   * @param email - The transmitted email
   * @param password - The transmitted password
   * @returns The user information
   */
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).then((resData) => {
      console.log(resData);
      this.authenticationHandling(resData.user.email, resData.user.uid, '', 3600, true);
      return resData;
    }).catch((error) => {
      console.log(error);
      throw error.message;
    });

    // The following comment code is designed for the Firebase Realtime Database and does not seem to work fine with the Angular Firestore Database but is kept if something will change.

    // return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, {
    //   email: email,
    //   password: password,
    //   returnSecureToken: true
    // }).pipe(catchError(this.errorHandling), tap((resData) => {
    //   this.authenticationHandling(resData.email, resData.localId, resData.idToken, +resData.expiresIn, password);
    // }));
  }

  /**
   * Checks for a user in the local storage and if available tries to log the user in.
   *
   * @returns
   */
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    this.userData = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (this.userData.email) {
      this.user.next(this.userData);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

    // this.auth.authState.subscribe((user) => {
    //   console.log("US", user);
    //   if (user.uid != userData.id) {
    //     this.logout();
    //     return;
    //   }
    //   if (user.email != userData.email) {
    //     this.logout();
    //     return;
    //   }
    // });

  }

  /**
   * Logs the user out and removes his data in the local storage.
   */
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * Automatically logs the user out after a certain amount of time.
   *
   * @param {number} expirationDuration - The timespan after login when the user should get logged out automatically
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /**
   * Creates the current user and initiates the autoLogout function.
   *
   * @param {string} email - The user's email
   * @param {string} userId - The user's userId
   * @param {string} token - The user's token
   * @param {number} expiresIn - The time from now when the token expires
   * @param {boolean} loginMode - If the user is in loginMode
   */
  private authenticationHandling(email: string, userId: string, token: string, expiresIn: number, loginMode: boolean) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    this.userData = new User(email, userId, token, expirationDate);
    this.user.next(this.userData);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(this.userData));
    if (!loginMode) {
      this.createUserData();
    }
  }

  /**
   * Creates the user data in firestore, only required when the user signs up.
   */
  private createUserData() {
    this.firestore.collection(`user-${this.userData.id}`).doc('info').set({ email: this.userData.email });
    this.firestore.collection('users').doc('amount').get().pipe(take(1)).subscribe((amountData: any) => {
      let currentUser = amountData.data().userAmount;
      this.firestore.collection('users').doc('list').update({ [currentUser]: { 'email': this.userData.email, 'id': this.userData.id } });
      this.firestore.collection('users').doc('amount').set({ 'userAmount': currentUser + 1 });
    });
  }

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
}
