import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent implements OnInit {

  links: Array<String> = ['html-css', 'javascript'];

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav(sidenav: MatToolbar, name: HTMLSpanElement) {
    sidenav._elementRef.nativeElement.classList.toggle('open');
    name.classList.toggle('d-none');
  }

}
