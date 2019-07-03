import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-add-level',
  templateUrl: './dialog-add-level.component.html',
  styleUrls: ['./dialog-add-level.component.scss']
})
export class DialogAddLevelComponent implements OnInit {
  outputData = 'output data';
  formData: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  buildForm() {
    this.formData = this.fb.group({
      title: [this.data.title, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
