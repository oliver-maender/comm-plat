import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent implements OnInit {

  links: Array<String> = ['html-css', 'javascript'];
  users = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.showUserList();
  }

  /**
   * Toggles the sidenav between open and (mostly) closed.
   *
   * @param {MatToolbar} sidenav - The first sidenav
   * @param {HTMLSpanElement} name - The name of the content of the first sidenav
   * @param {MatToolbar} sidenav2 - The second sidenav
   * @param {HTMLSpanElement} name2 - The name of the content of the second sidenav
   */
  toggleSidenavs(sidenav: MatToolbar, name: HTMLSpanElement, sidenav2: MatToolbar, name2: HTMLSpanElement) {
    sidenav._elementRef.nativeElement.classList.toggle('open');
    name.classList.toggle('d-none');
    sidenav2._elementRef.nativeElement.classList.toggle('open');
    name2.classList.toggle('d-none');
  }

  /**
   * Shows the list of all users.
   */
  showUserList() {
    this.authService.showUserList().subscribe((resData: any) => {
      this.users = [];
      console.log(resData);
      for (const user in resData) {
        if (Object.prototype.hasOwnProperty.call(resData, user)) {
          const element = resData[user];
          this.users.push(element);
        }
      }
    });
  }

}
