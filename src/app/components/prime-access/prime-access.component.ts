import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {DialogUserViewComponent} from '../../dialog/dialog-user-view/dialog-user-view.component';
import {Location} from '@angular/common';
import {DialogPrimeAccessComponent} from '../../dialog/dialog-prime-access/dialog-prime-access.component';

export interface User {
  userId: string;
  name: string;
  username: string;
  designation: string;
  duration: string;
  bloodGroup: string;
  userLevel: string;
  status: string;
}

@Component({
  selector: 'app-prime-access',
  templateUrl: './prime-access.component.html',
  styleUrls: ['./prime-access.component.scss']
})
export class PrimeAccessComponent implements OnInit {
  searchKey: string;
  primaryData: any;
  tableData: any;
  displayedColumns: string[] = ['name', 'username', 'userLevel', 'status', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    public location: Location
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers() {
    this.dataService.getAllUsers().subscribe(sc => {
      const users: User[] = [];
      this.primaryData = sc;
      this.primaryData.forEach((userData) => {

        const user: User = {
          userId: userData.userId,
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
        const logicBool6 = data.userLevel.toLowerCase().includes(filter);
        const logicBool7 = data.status.toLowerCase().includes(filter);
        return (logicBool1 || logicBool2 || logicBool6 || logicBool7);
      };
    });
  }

  userTableFilter(value: any) {
    this.tableData.filter = value.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.userTableFilter(this.searchKey);
  }

  openDialog(userId: string): void {

    this.dataService.getPrimeAccessByUserId(userId).subscribe(scPrimeAccess => {
      const aUserById = this.primaryData.find(user => user.userId === userId);

      const dualData = {
        user: aUserById,
        primeAccess: scPrimeAccess
      };

      const dialogRef = this.dialog.open(DialogPrimeAccessComponent, {
        width: '450px',
        panelClass: 'userViewModal',
        data: dualData
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log("updating prime access");
          this.dataService.setPrimeAccessByUserId(userId, result).subscribe(sc => {
            console.log(sc);
          });
        }
      });


    });

  }

}
