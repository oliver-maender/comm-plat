import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userEmail = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = this.authService.userEmail;
  }

}
