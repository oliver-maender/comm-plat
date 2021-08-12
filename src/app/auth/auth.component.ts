import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { DeniedComponent } from './denied/denied.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode = true;
  loading = false;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Switches between loginMode and not loginMode to determine if a user wants to log in or sign up.
   */
  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  /**
   * Manages the login and submit routine depending on in which mode the user is.
   *
   * @param {NgForm} myForm - The form submitted
   * @returns
   */
  onSubmit(myForm: NgForm) {
    if (!myForm.valid) {
      return;
    }
    const email = myForm.value.email;
    const password = myForm.value.password;

    this.loading = true;

    if (this.loginMode) {
      this.authService.login(email, password).then((resData) => {
        console.log(resData);
        this.loading = false;
        this.router.navigate(['/']);
      }).catch((errorMessage) => {
        console.log(errorMessage);
        this.openDeniedDialog(errorMessage);
        this.loading = false;
      });
    } else {
      this.authService.signup(email, password).then((resData) => {
        console.log(resData);
        this.loading = false;
        this.router.navigate(['/']);
      }).catch((errorMessage) => {
        console.log(errorMessage);
        this.openDeniedDialog(errorMessage);
        this.loading = false;
      });
    }

    myForm.reset();
  }

  /**
   * Opens the error dialog if an error occured.
   *
   * @param error - The error message
   */
  openDeniedDialog(error: string) {
    this.dialog.open(DeniedComponent, {
      data: { message: error }
    });
  }

}
