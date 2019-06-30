import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {CustomValidator} from '../../services/custom.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  hide = true;
  newUser: FormGroup;
  userLevels: any;

  constructor(private fb: FormBuilder,
              private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getAllLevels().subscribe(sc => {
      this.userLevels = sc;
      console.log(sc);
      this.buildForm();

      console.log(this.newUser);
      this.newUser.valueChanges.subscribe(val => {
        console.log(this.newUser);
        console.log((val.dgnFromDate as Date).getTime());
        console.log((val.dgnFromDate));
      });


    });
  }

  buildForm() {
    this.newUser = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z a-z.-]{3,30}$')]],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9]+$')
      ], CustomValidator.uniqueUsername(this.dataService)],
      dob: [new Date(), Validators.required],
      userLevelId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      gender: ['Male'],
      religion: ['Islam'],
      bloodGroup: ['A+'],
      address: [''],
      dgnTitle: ['', Validators.required],
      dgnFromDate: [new Date(), Validators.required],
      emails: this.fb.array([
        this.makeEmailGroup()
      ]),
      phones: this.fb.array([
        this.makePhoneGroup()
      ])
    });
  }

  mapUserData(data: any): any {
    const aUser = {
      userId: null,
      name: data.name,
      dob: (Math.trunc(data.dob.getTime() / 1000)).toString(),
      username: data.username,
      password: data.password,
      gender: data.gender,
      religion: data.religion,
      bloodGroup: data.bloodGroup,
      address: data.address,
      joinTime: (Math.trunc((new Date().getTime()) / 1000)).toString(),
      userLevelId: data.userLevelId,
      blocked: '0',
      phones: data.phones,
      emails: data.emails,
      designations: [
        {
          fromTime: (Math.trunc(data.dgnFromDate.getTime() / 1000)).toString(),
          toTime: '0',
          title: data.dgnTitle
        }
      ]
    };

    return aUser;
  }


  addNewUser() {
    // console.log(this.mapUserData(this.newUser.value));
    this.dataService.createNewUser(this.mapUserData(this.newUser.value)).subscribe(sc => {
      console.log(sc);
    });
  }



  makeEmailGroup(): FormGroup {
    return this.fb.group({
      emailType: ['Work'],
      email: ['', [Validators.required, Validators.email]]
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
      phoneType: ['Work'],
      number: ['', Validators.required]
    });
  }
  addPhoneGroup() {
    (this.newUser.get('phones') as FormArray).push(this.makePhoneGroup());
  }
  removePhoneGroup(groupIndexNumber: number) {
    (this.newUser.get('phones') as FormArray).removeAt(groupIndexNumber);
  }

}
