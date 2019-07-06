import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/index';
import {map, startWith} from 'rxjs/internal/operators';
import {Location} from '@angular/common';
import {DialogChangeLevelAppPermissionComponent} from '../../dialog/dialog-change-level-app-permission/dialog-change-level-app-permission.component';
import {MatDialog, MatSnackBar} from '@angular/material';

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

  remainingAppListToAdd: App[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.levelAppsId = params.get('id');
      this.getAndSetData();
    });



    this.appPickControl.valueChanges.subscribe(val => {
      // console.log(this.selectedAppId);
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

      // clear Remaining app list to add
      this.remainingAppListToAdd.length = 0;

      sc.forEach(iApp => {

        const anApp: App = {
          appId: iApp.appId,
          appName: iApp.appName
        };

        const abc = this.permittedAppList.appList.filter(datas => datas.appName.toLowerCase().includes(anApp.appName.toLowerCase()));

        if (abc.length === 0) {
          this.remainingAppListToAdd.push(anApp);
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

  removeAppFromThisLevel(id: string) {

    const conf = confirm('Do you want remove this app form user level');

    if (conf) {
      console.log('Removing permission from this level');
      this.dataService.removeAppFromLevel(id).subscribe(sc => {
        console.log(sc);
        this.getAndSetData();
      });
    } else {
      console.log('Canceled remove action');
    }

  }


  updateLevelPermission(permissionId: string) {


    this.dataService.getLevelAppPermissionData(permissionId).subscribe(sc => {

      const levelAppPermissionData: any = sc;

      const appPermission = {
        permissionId: levelAppPermissionData.permissionId,
        appId: levelAppPermissionData.appId,
        levelId: levelAppPermissionData.levelId,
        title: levelAppPermissionData.title,
        description: levelAppPermissionData.description,
        appName: levelAppPermissionData.appName,
        url: levelAppPermissionData.url,
        sessAryName: levelAppPermissionData.sessAryName,
        remark: levelAppPermissionData.remark,
        accessList: levelAppPermissionData.accessList
      }

      const dialogRef = this.dialog.open(DialogChangeLevelAppPermissionComponent, {
        width: '600px',
        panelClass: 'userViewModal',
        data: appPermission
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Updating level permission');

          // console.log(result);
          this.dataService.udateLevelAppPermissionData(result).subscribe(sc => {
            console.log(sc);
            this.snackBar.open('App permission updated for this level', 'ok', {
              duration: 2000,
              horizontalPosition: 'right'
            });
          });

        } else {
          console.log('Dialog canceled');
        }
      });

    });

  }

  private _filter(value: string): App[] {
    const filterValue = value.toLowerCase();

    return this.remainingAppListToAdd.filter(anApp => anApp.appName.toLowerCase().includes(filterValue));
  }

}
