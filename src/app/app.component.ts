import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'comm-plat';
  auth = false;

  authenticate(authState: boolean, email: string) {
    this.auth = authState;
    console.log(email);
  }
}
