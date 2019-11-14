import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {CustomValidator} from '../../services/custom.validator';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {
  editAppId: string;
  editApp: FormGroup;

  constructor(
    public gs: GlobalService,
    private fb: FormBuilder,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.editAppId = params.get('id');
      this.getAppDataAndSetToForm();
    });
  }


  buildForm() {
    this.editApp = this.fb.group({
      appName: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('^(http|HTTP)(|s|S)(:\\/\\/).{2,100}$')]],
      sessAryName: [{value: '', disabled: true}, [Validators.required, Validators.minLength(2)]],
      remark: [''],
      accesses: this.fb.array([])
    });
  }


  mapEditAppData(data: any): any {
    const anApp = {
      appId: this.editAppId,
      appName: data.appName,
      url: data.url,
      remark: data.remark,
      disabled: '0',
      accesses: data.accesses
    };
    return anApp;
  }

  getAppDataAndSetToForm() {
    this.dataService.getAppById(this.editAppId).subscribe(sc => {
      // console.log(sc);
      // Building form could be set on lifecycle hook
      this.buildForm();

      // building form array for accesses
      const accessesFormArray = this.fb.array([]);

      sc.accesses.forEach(access => {
        accessesFormArray.push(this.fb.group({
          accessId: access.accessId,
          definition: access.definition,
          keyword: access.keyword,
          val: access.val
        }));
      });

      this.editApp.patchValue({
        appName: sc.appName,
        url: sc.url,
        sessAryName: sc.sessAryName,
        remark: sc.remark
      });
      this.editApp.setControl('accesses', accessesFormArray);

    });
  }

  saveApp() {
    this.gs.isLoading = true;
    const dataToSend = this.mapEditAppData(this.editApp.value);
    // console.log(dataToSend);
    this.dataService.updateApp(dataToSend).subscribe(sc => {
      console.log(sc);
      this.gs.isLoading = false;
      this.location.back();
    });
  }

  makeAccessGroup(): FormGroup {
    return this.fb.group({
      accessId: null,
      keyword: ['', Validators.required],
      definition: ['', Validators.required],
      val: [false]
    });
  }
  addAccessGroup() {
    (this.editApp.get('accesses') as FormArray).push(this.makeAccessGroup());
  }
  removeAccessGroup(groupIndex: number) {
    (this.editApp.get('accesses') as FormArray).removeAt(groupIndex);
  }

}
