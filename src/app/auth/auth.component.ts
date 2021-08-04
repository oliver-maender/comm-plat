import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/user.service';
import { DeniedComponent } from './denied/denied.component';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Output() authentication = new EventEmitter<{ registered: boolean, email: string }>();

  constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, {
        email: myForm.value.email,
        password: myForm.value.password,
        returnSecureToken: true
      }).pipe(take(1)).subscribe((resData) => {
        this.authentication.next({ registered: true, email: resData.email });
        this.userService.setCurrentUser(resData.email);
        console.log(resData);
      }, (errorRes) => {
        if (errorRes.error.error.message === 'EMAIL_NOT_FOUND') {
          this.openDeniedDialog('There is no user with this email address.');
        } else if (errorRes.error.error.message === 'INVALID_PASSWORD') {
          this.openDeniedDialog('Wrong password.');
        } else {
          this.openDeniedDialog(errorRes.error.error.message);
        }
        console.log(errorRes);
      });
    }
  }

  openDeniedDialog(error: string) {
    this.dialog.open(DeniedComponent, {
      data: { message: error }
    });
  }

}
