import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  user = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.currentUsername;
  }

}
