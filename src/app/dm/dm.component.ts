import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
  styleUrls: ['./dm.component.scss']
})
export class DmComponent implements OnInit {

  recipientName = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipientName = params['user'];
    });
  }

  /**
   * Scrolls to the top of the page
   */
  scrollUp() {
    window.scrollTo(0, 0);
  }

}
