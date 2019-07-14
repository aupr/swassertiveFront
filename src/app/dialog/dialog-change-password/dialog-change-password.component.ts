import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {

  hidex = true;
  hide = true;

  constructor(
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
