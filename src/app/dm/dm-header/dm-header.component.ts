import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dm-header',
  templateUrl: './dm-header.component.html',
  styleUrls: ['./dm-header.component.scss']
})
export class DmHeaderComponent implements OnInit {

  @Input() recipientName = '';
  recipientEmail = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.dataService.showUserList().pipe(take(1)).subscribe((resData: any) => {
        for (const user in resData) {
          if (Object.prototype.hasOwnProperty.call(resData, user)) {
            const element = resData[user];
            if (element.id == this.recipientName) {
              this.recipientEmail = element.email;
            }
          }
        }
      });
    });
  }

  /**
   * Scrolls down to the bottom of the page.
   */
  scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

}
