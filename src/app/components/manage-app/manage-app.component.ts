import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

export interface App {
  appId: string;
  appName: string;
  sessAryName: string;
  remark: string;
  status: string;
}


@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.component.html',
  styleUrls: ['./manage-app.component.scss']
})
export class ManageAppComponent implements OnInit {
  searchKey: string;
  primaryData: any;
  tableData: any;
  displayedColumns: string[] = ['appName', 'sessAryName', 'remark', 'status', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getAllApps();
  }

  getAllApps() {
    this.dataService.getAllApps().subscribe(sc => {
      const apps: App[] = [];
      this.primaryData = sc;
      this.primaryData.forEach((appData) => {

        const app: App = {
          appId: appData.appId,
          appName: appData.appName,
          sessAryName: appData.sessAryName,
          remark: appData.remark,
          status: 'N/A'
        };

        apps.push(app);
      });

      this.tableData = new MatTableDataSource(apps);
      this.tableData.sort = this.sort;
      this.tableData.paginator = this.paginator;

      this.tableData.filterPredicate = (data, filter: string) => {
        const logicBool1 = data.appName.toLowerCase().includes(filter);
        const logicBool2 = data.sessAryName.toLowerCase().includes(filter);
        const logicBool3 = data.remark.toLowerCase().includes(filter);
        const logicBool4 = data.status.toLowerCase().includes(filter);
        return (logicBool1 || logicBool2 || logicBool3 || logicBool4);
      };
    });
  }

  appTableFilter(value: any) {
    this.tableData.filter = value.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.appTableFilter(this.searchKey);
  }


}
