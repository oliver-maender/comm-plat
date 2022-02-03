import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub!: Subscription;

  authenticated = false;
  userEmail = '';

  constructor(private authService: AuthService) { }

  /**
   * Initiates the logout routine when clicked on the button in the header
   */
  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      console.log(user);
      if (user) {
        this.userEmail = user.email;
        this.authenticated = true;
      } else {
        this.userEmail = '';
        this.authenticated = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
