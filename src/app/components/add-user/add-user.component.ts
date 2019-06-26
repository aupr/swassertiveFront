import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  hide = true;
  newUser: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    console.log(this.newUser);
    this.newUser.valueChanges.subscribe(val => {
      console.log(val);
      console.log((val.expDate as Date).getTime());
      console.log((val.expDate));
    });
  }

  buildForm() {
    this.newUser = this.fb.group({
      name: ['', Validators.required],
      username: ['d'],
      password: ['f'],
      expDate: [new Date()],
      emails: this.fb.array([
        this.makeEmailGroup()
      ]),
      phones: this.fb.array([
        this.makePhoneGroup()
      ])
    });
  }



  makeEmailGroup(): FormGroup {
    return this.fb.group({
      type: ['Work'],
      email: ['']
    });
  }
  addEmailGroup() {
    (this.newUser.get('emails') as FormArray).push(this.makeEmailGroup());
  }
  removeEmailGroup(groupIndexNumber: number) {
    (this.newUser.get('emails') as FormArray).removeAt(groupIndexNumber);
  }

  makePhoneGroup(): FormGroup {
    return this.fb.group({
      type: ['Work'],
      number: ['']
    });
  }
  addPhoneGroup() {
    (this.newUser.get('phones') as FormArray).push(this.makePhoneGroup());
  }
  removePhoneGroup(groupIndexNumber: number) {
    (this.newUser.get('phones') as FormArray).removeAt(groupIndexNumber);
  }

}
