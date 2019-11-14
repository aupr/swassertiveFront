import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {GlobalService} from '../../services/global.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  hide = true;
  formData: FormGroup;
  userLevels: any;
  primeUserData: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    public location: Location,
    public gs: GlobalService,
    private activatedRoute: ActivatedRoute
  ) {
    if (!this.gs.userData.primeAccess.editUser){
      this.location.back();
    }
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.dataService.getUserById(params.get('id')).subscribe(userRtSc => {

        this.primeUserData = userRtSc;

        this.dataService.getAllLevels().subscribe(sc => {
          this.userLevels = sc;
          console.log(sc);
          this.buildForm();

          // making array data
          const userEmails = this.fb.array([]);
          userRtSc.emails.forEach(email => {
            userEmails.push(this.fb.group({
              emailId: email.emailId,
              emailType: email.emailType,
              email: email.email
            }));
          });
          const userPhones = this.fb.array([]);
          userRtSc.phones.forEach(phone => {
            userPhones.push(this.fb.group({
              phoneId: phone.phoneId,
              phoneType: phone.phoneType,
              number: phone.number
            }));
          });



          // console.log(userRtSc);
          this.formData.patchValue({
            name: userRtSc.name,
            username: userRtSc.username,
            dob: new Date(Number(userRtSc.dob) * 1000),
            userLevelId: userRtSc.userLevel.levelId.toString(),
            gender: userRtSc.gender,
            religion: userRtSc.religion,
            bloodGroup: userRtSc.bloodgroup,
            address: userRtSc.address,
            dgnTitle: userRtSc.designations[0].title,
            dgnFromDate: new Date(Number(userRtSc.designations[0].fromTime) * 1000),
          });
          this.formData.setControl('emails', userEmails);
          this.formData.setControl('phones', userPhones);

          // console.log(this.formData);

          /*this.formData.valueChanges.subscribe(val => {
            console.log(this.formData);
            console.log((val.dgnFromDate as Date).getTime());
            console.log((val.dgnFromDate));
          });*/

        });

      });
    });

  }

  buildForm() {
    this.formData = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z a-z.-]{3,30}$')]],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9]+$')
      ]],
      dob: ['', Validators.required],
      userLevelId: ['', Validators.required],
      gender: [''],
      religion: [''],
      bloodGroup: [''],
      address: [''],
      dgnTitle: ['', Validators.required],
      dgnFromDate: ['', Validators.required],

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
      userId: this.primeUserData.userId,
      name: data.name,
      dob: (Math.trunc(data.dob.getTime() / 1000)).toString(),
      username: data.username,
      gender: data.gender,
      religion: data.religion,
      bloodgroup: data.bloodGroup,
      address: data.address,
      jointime: (Math.trunc((new Date().getTime()) / 1000)).toString(),
      userLevelId: data.userLevelId,
      blocked: '0',
      phones: data.phones,
      emails: data.emails,
      designations: [
        {
          dgnId: null,
          fromTime: (Math.trunc(data.dgnFromDate.getTime() / 1000)).toString(),
          toTime: '0',
          title: data.dgnTitle
        }
      ]
    };

    return aUser;
  }


  updateUser() {
    this.gs.isLoading = true;
    // console.log(this.mapUserData(this.formData.value));
    console.log('updating user data');
    this.dataService.updateUser(this.mapUserData(this.formData.value)).subscribe(sc => {
      console.log(sc);
      this.gs.isLoading = false;
      this.location.back();
    });
  }


  makeEmailGroup(): FormGroup {
    return this.fb.group({
      emailId: null,
      emailType: ['Work'],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  addEmailGroup() {
    (this.formData.get('emails') as FormArray).push(this.makeEmailGroup());
  }
  removeEmailGroup(groupIndexNumber: number) {
    (this.formData.get('emails') as FormArray).removeAt(groupIndexNumber);
  }

  makePhoneGroup(): FormGroup {
    return this.fb.group({
      phoneId: null,
      phoneType: ['Work'],
      number: ['', Validators.required]
    });
  }
  addPhoneGroup() {
    (this.formData.get('phones') as FormArray).push(this.makePhoneGroup());
  }
  removePhoneGroup(groupIndexNumber: number) {
    (this.formData.get('phones') as FormArray).removeAt(groupIndexNumber);
  }

}
