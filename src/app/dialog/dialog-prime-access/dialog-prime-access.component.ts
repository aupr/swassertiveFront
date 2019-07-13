import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-prime-access',
  templateUrl: './dialog-prime-access.component.html',
  styleUrls: ['./dialog-prime-access.component.scss']
})
export class DialogPrimeAccessComponent implements OnInit {

  user: any;
  primeAccess: any;

  constructor(
    public dialogRef: MatDialogRef<DialogPrimeAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.user = this.data.user;
    this.primeAccess = this.data.primeAccess;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
