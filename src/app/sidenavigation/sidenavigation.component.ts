import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DialogShowUserListComponent } from '../dialog-show-user-list/dialog-show-user-list.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent implements OnInit, OnDestroy {

  links: Array<String> = ['general', 'fun-talk'];
  // users = [];
  contactedUsers = [];
  newMessage = [];
  userEmail = '';

  private userSub!: Subscription;

  // authStateSubscription!: Subscription;
  authState2Subscription!: Subscription;

  changeContactedUserSubscription!: Subscription;
  // changeContactedUserArraySubscription!: Subscription;

  listenToContactedUsersSubscription!: Subscription;

  constructor(private auth: AngularFireAuth, private dataService: DataService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.showUserList();
    this.showContactedUserList();
    this.changeContactedUserSubscription = this.dataService.changeContactedUser.subscribe((user: string) => {
      this.rearrangeContactedUsers(user);
    });

    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = '';
      }
    });
  }

  /**
   * Rearranges the contacted users list if a new message is sent or received so that this user is on top of the list.
   *
   * @param userId - The user's Id
   */
  rearrangeContactedUsers(userId: string) {
    let fromIndex = this.contactedUsers.findIndex(userToR => userToR['id'] === userId);
    if (fromIndex > -1) {
      let element = this.contactedUsers[fromIndex];
      this.contactedUsers.splice(fromIndex, 1);
      this.contactedUsers.splice(0, 0, element);
    }
    this.dataService.updateDatabaseRecipients(this.contactedUsers);
    if (userId != this.authService.userId) {
      this.dataService.updateDatabaseRecipientRecipients(userId, this.authService.userId);
    }
  }

  /**
   * Opens the dialog to show all users.
   */
  openDialogShowUserList() {
    this.dialog.open(DialogShowUserListComponent);
  }

  /**
   * Gets the contacted user list and shows it.
   */
  showContactedUserList() {
    if (this.authState2Subscription) {
      this.authState2Subscription.unsubscribe();
    }
    this.authState2Subscription = this.auth.authState.subscribe((users) => {
      if (this.listenToContactedUsersSubscription) {
        this.listenToContactedUsersSubscription.unsubscribe();
      }
      this.listenToContactedUsersSubscription = this.dataService.listenToContactedUsersArray().subscribe((userList: any) => {
        this.contactedUsers = [];
        for (const user in userList) {
          if (Object.prototype.hasOwnProperty.call(userList, user)) {
            const element = userList[user];
            this.contactedUsers.push(element);
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    // if (this.authStateSubscription) {
    //   this.authStateSubscription.unsubscribe();
    // }
    this.changeContactedUserSubscription.unsubscribe();
    // this.changeContactedUserArraySubscription.unsubscribe();
    if (this.authState2Subscription) {
      this.authState2Subscription.unsubscribe();
    }
    if (this.listenToContactedUsersSubscription) {
      this.listenToContactedUsersSubscription.unsubscribe();
    }
    this.userSub.unsubscribe();
  }

}
