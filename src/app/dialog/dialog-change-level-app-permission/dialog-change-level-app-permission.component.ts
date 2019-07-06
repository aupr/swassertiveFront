import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-change-level-app-permission',
  templateUrl: './dialog-change-level-app-permission.component.html',
  styleUrls: ['./dialog-change-level-app-permission.component.scss']
})
export class DialogChangeLevelAppPermissionComponent implements OnInit {

  prmData: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogChangeLevelAppPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.prmData = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
