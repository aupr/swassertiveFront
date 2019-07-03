import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {CustomValidator} from '../../services/custom.validator';
import {Location} from '@angular/common';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.scss']
})
export class AddAppComponent implements OnInit {

  newApp: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private location: Location,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.newApp = this.fb.group({
      appName: ['', Validators.required],
      url: ['http://', [Validators.required, Validators.pattern('^(http|HTTP)(|s|S)(:\\/\\/).{2,100}$')]],
      sessAryName: ['', [Validators.required, Validators.minLength(2)], CustomValidator.uniqueBaseName(this.dataService)],
      remark: [''],
      accesses: this.fb.array([
        this.makeAccessGroup()
      ])
    });
  }


  mapNewApp(data: any): any {
    const anApp = {
      appId: null,
      appName: data.appName,
      url: data.url,
      sessAryName: data.sessAryName,
      remark: data.remark,
      disabled: '0',
      accesses: data.accesses
    };
    return anApp;
  }


  saveNewApp() {
    this.gs.isLoading = true;
    // console.log(this.newApp.value);
    this.dataService.createNewApp(this.mapNewApp(this.newApp.value)).subscribe(sc => {
      console.log(sc);
      this.gs.isLoading = false;
      this.location.back();
    });
  }

  makeAccessGroup(): FormGroup {
    return this.fb.group({
      keyword: ['', Validators.required],
      definition: ['', Validators.required],
      val: [false]
    });
  }
  addAccessGroup() {
    (this.newApp.get('accesses') as FormArray).push(this.makeAccessGroup());
  }
  removeAccessGroup(groupIndex: number) {
    (this.newApp.get('accesses') as FormArray).removeAt(groupIndex);
  }



}
