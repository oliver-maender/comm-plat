import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  message: string;
}

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.scss']
})
export class DeniedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeniedComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  /**
   * Closes the dialog when clicked on ok.
   */
  onOkClick() {
    this.dialogRef.close();
  }

}
