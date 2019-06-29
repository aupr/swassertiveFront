import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.scss']
})
export class AddAppComponent implements OnInit {

  newApp: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.newApp = this.fb.group({
      appName: ['', Validators.required],
      url: ['', Validators.required],
      sessAryName: ['', Validators.required],
      remark: [''],
      accesses: this.fb.array([
        this.makeAccessGroup()
      ])
    });
  }

  makeAccessGroup(): FormGroup {
    return this.fb.group({
      keyword: ['', Validators.required],
      definition: ['', Validators.required],
      val: [false]
    });
  }

}
