import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-header',
  templateUrl: './channel-header.component.html',
  styleUrls: ['./channel-header.component.scss']
})
export class ChannelHeaderComponent implements OnInit {

  @Input() channelName = '';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Scrolls down to the bottom of the page.
   */
  scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

}
