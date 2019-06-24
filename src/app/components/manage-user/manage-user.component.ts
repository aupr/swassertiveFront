import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {DialogUserViewComponent} from '../dialog-user-view/dialog-user-view.component';

export interface User {
  userId: number;
  name: string;
  username: string;
  designation: string;
  duration: string;
  bloodGroup: string;
  userLevel: string;
  status: string;
}


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  searchKey: string;
  tableData: any;
  displayedColumns: string[] = ['name', 'username', 'designation', 'duration', 'bloodGroup', 'userLevel', 'status', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers() {
    this.dataService.getAllUsers().subscribe(sc => {
      const users: User[] = [];
      sc.forEach((userData) => {

        const user: User = {
          userId: Number(userData.userId),
          name: userData.name,
          username: userData.username,
          designation: 'M/A',
          duration: 'N/A',
          bloodGroup: userData.bloodgroup,
          userLevel: userData.userLevel.title,
          status: 'N/A'
        };

        users.push(user);
      });

      this.tableData = new MatTableDataSource(users);
      this.tableData.sort = this.sort;
      this.tableData.paginator = this.paginator;

      this.tableData.filterPredicate = (data, filter: string) => {
        const logicBool1 = data.name.toLowerCase().includes(filter);
        const logicBool2 = data.username.toLowerCase().includes(filter);
        const logicBool3 = data.designation.toLowerCase().includes(filter);
        const logicBool4 = data.duration.toLowerCase().includes(filter);
        const logicBool5 = data.bloodGroup.toLowerCase().includes(filter);
        const logicBool6 = data.userLevel.toLowerCase().includes(filter);
        const logicBool7 = data.status.toLowerCase().includes(filter);
        return (logicBool1 || logicBool2 || logicBool3 || logicBool4 || logicBool5 || logicBool6 || logicBool7);
      };
    });
  }

  userTableFilter(value: any) {
    this.tableData.filter = value.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

  onSearchClear() {
    this.searchKey = '';
    this.userTableFilter(this.searchKey);
  }

  openDialog(userData: any): void {
    console.log(userData)
    const dialogRef = this.dialog.open(DialogUserViewComponent, {
      width: '250px',
      panelClass: 'userViewModal',
      data: userData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
      }
    });
  }


}
