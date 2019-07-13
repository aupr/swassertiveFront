import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-user-view',
  templateUrl: './dialog-user-view.component.html',
  styleUrls: ['./dialog-user-view.component.scss']
})
export class DialogUserViewComponent implements OnInit {

  outputData = 'output data';
  constructor(
    public dialogRef: MatDialogRef<DialogUserViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
