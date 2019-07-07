import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {GlobalService} from '../../services/global.service';
import {CustomValidator} from '../../services/custom.validator';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  hide = true;
  newUser: FormGroup;
  userLevels: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private location: Location,
    private gs: GlobalService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.dataService.getUserById(params.get('id')).subscribe(userRtSc => {




        this.dataService.getAllLevels().subscribe(sc => {
          this.userLevels = sc;
          console.log(sc);
          this.buildForm(userRtSc);

          // console.log(this.newUser);

          /*this.newUser.valueChanges.subscribe(val => {
            console.log(this.newUser);
            console.log((val.dgnFromDate as Date).getTime());
            console.log((val.dgnFromDate));
          });*/

        });

      });
    });

  }

  buildForm(user: any) {
    this.newUser = this.fb.group({
      name: [user.name, [Validators.required, Validators.pattern('^[A-Z a-z.-]{3,30}$')]],
      username: [user.username, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9]+$')
      ], CustomValidator.uniqueUsername(this.dataService)],
      dob: [new Date(Number(user.dob) * 1000), Validators.required],
      userLevelId: [user.userLevel.levelId.toString(), Validators.required],
      gender: [user.gender],
      religion: [user.religion],
      bloodGroup: [user.bloodgroup],
      address: [user.address],
      dgnTitle: [user.designations[0].title, Validators.required],
      dgnFromDate: [new Date(Number(user.designations[0].fromTime) * 1000), Validators.required],

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
    this.gs.isLoading = true;
    // console.log(this.mapUserData(this.newUser.value));
    this.dataService.createNewUser(this.mapUserData(this.newUser.value)).subscribe(sc => {
      console.log(sc);
      this.gs.isLoading = false;
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
