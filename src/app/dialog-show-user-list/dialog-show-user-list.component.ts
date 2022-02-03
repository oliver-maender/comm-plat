import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dialog-show-user-list',
  templateUrl: './dialog-show-user-list.component.html',
  styleUrls: ['./dialog-show-user-list.component.scss']
})
export class DialogShowUserListComponent implements OnInit, OnDestroy {

  users = [];
  authStateSubscription!: Subscription;
  userListLoaded = false;

  constructor(private auth: AngularFireAuth, private dataService: DataService, public dialogRef: MatDialogRef<DialogShowUserListComponent>) { }

  ngOnInit(): void {
    this.showUserList();
  }

  /**
 * Shows the list of all users.
 */
  showUserList() {
    this.authStateSubscription = this.auth.authState.subscribe((user) => {
      this.dataService.showUserList().pipe(take(1)).subscribe((resData: any) => {
        this.users = [];
        console.log(resData);
        for (const user in resData) {
          if (Object.prototype.hasOwnProperty.call(resData, user)) {
            const element = resData[user];
            this.users.push(element);
          }
        }
        this.userListLoaded = true;
      });
    });
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

}
