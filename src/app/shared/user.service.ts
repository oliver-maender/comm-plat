import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = '';

  constructor() { }

  get currentUsername() {
    return this.currentUser;
  }

  setCurrentUser(username: string) {
    this.currentUser = username;
  }
}
