import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/index';
import {map, startWith} from 'rxjs/internal/operators';

export interface App {
  appId: string;
  appName: string;
}

@Component({
  selector: 'app-manage-level-app',
  templateUrl: './manage-level-app.component.html',
  styleUrls: ['./manage-level-app.component.scss']
})
export class ManageLevelAppComponent implements OnInit {
  levelAppsId: string;
  permittedAppList: any;

  appPickControl = new FormControl();
  filteredOptions: Observable<App[]>;
  selectedAppId = '';

  allAppList: App[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.levelAppsId = params.get('id');
      this.getAndSetData();
    });



    this.appPickControl.valueChanges.subscribe(val => {
      console.log(this.selectedAppId);
      this.selectedAppId = '';
    });

  }

  getAndSetData() {
    this.getLevelApps();
  }

  getLevelApps() {
    this.dataService.getLevelApps(this.levelAppsId).subscribe(sc => {
      // console.log(sc);
      this.permittedAppList = sc;
      this.getAppList();
    });
  }

  getAppList() {
    this.dataService.getAllApps().subscribe(sc => {

      sc.forEach(iApp => {

        const anApp: App = {
          appId: iApp.appId,
          appName: iApp.appName
        };

        const abc = this.permittedAppList.appList.filter(datas => datas.appName.toLowerCase().includes(anApp.appName.toLowerCase()));

        if (abc.length === 0) {
          this.allAppList.push(anApp);
        }



      });

      this.filteredOptions = this.appPickControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    });
  }

  setOption(appId: string) {
    this.selectedAppId = appId;
  }

  addAppToThisLevel() {

    const pdt = {
      permissionLevelId: this.levelAppsId,
      permissionAppId: this.selectedAppId
    };

    console.log('Adding new app to this level');

    this.dataService.addAppToLevel(pdt).subscribe(sc => {
      console.log(sc);
      this.appPickControl.setValue('');
      this.getAndSetData();
    });
  }

  private _filter(value: string): App[] {
    const filterValue = value.toLowerCase();

    return this.allAppList.filter(anApp => anApp.appName.toLowerCase().includes(filterValue));
  }

}
