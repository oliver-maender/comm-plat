import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dm-header',
  templateUrl: './dm-header.component.html',
  styleUrls: ['./dm-header.component.scss']
})
export class DmHeaderComponent implements OnInit {

  @Input() recipientName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
