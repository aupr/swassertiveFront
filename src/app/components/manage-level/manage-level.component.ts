import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {DialogAddLevelComponent} from '../../dialog/dialog-add-level/dialog-add-level.component';

export interface Level {
  levelId: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-manage-level',
  templateUrl: './manage-level.component.html',
  styleUrls: ['./manage-level.component.scss']
})

export class ManageLevelComponent implements OnInit {
  searchKey: string;
  primaryData: any;
  tableData: any;
  displayedColumns: string[] = ['title', 'description', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: DataService,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllLevels();
  }

  getAllLevels() {
    this.dataService.getAllLevels().subscribe(sc => {
      const levels: Level[] = [];
      this.primaryData = sc;
      this.primaryData.forEach((levelData) => {

        const level: Level = {
          levelId: levelData.levelId,
          title: levelData.title,
          description: levelData.description
        };

        levels.push(level);
      });

      this.tableData = new MatTableDataSource(levels);
      this.tableData.sort = this.sort;
      this.tableData.paginator = this.paginator;

      this.tableData.filterPredicate = (data, filter: string) => {
        const logicBool1 = data.title.toLowerCase().includes(filter);
        const logicBool2 = data.description.toLowerCase().includes(filter);
        return (logicBool1 || logicBool2);
      };
    });
  }

  levelTableFilter(value: any) {
    this.tableData.filter = value.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.levelTableFilter(this.searchKey);
  }

  addNewLevel() {
    const level: Level = {
      levelId: null,
      title: '',
      description: ''
    }

    const dialogRef = this.dialog.open(DialogAddLevelComponent, {
      width: '450px',
      panelClass: 'userViewModal',
      data: level
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Creating new level');
        this.dataService.createNewLevel(result).subscribe(sc => {
          console.log(sc);
          this.getAllLevels();
          this.snackBar.open('New user level added', 'OK', {
            duration: 3000,
            horizontalPosition: 'left'
          });
        });
      } else {
        console.log('Dialog canceled');
      }
    });
  }

  editLevel(levelId: string) {
    const aLevelById = this.primaryData.find(sLevel => sLevel.levelId === levelId);
    const level: Level = {
      levelId: aLevelById,
      title: aLevelById.title,
      description: aLevelById.description
    }

    const dialogRef = this.dialog.open(DialogAddLevelComponent, {
      width: '450px',
      panelClass: 'userViewModal',
      data: level
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updating new level');
        const pdt = {
          levelId: aLevelById.levelId,
          title: result.title,
          description: result.description
        };
        this.dataService.editLevel(pdt).subscribe(sc => {
          console.log(sc);
          this.getAllLevels();
          this.snackBar.open('Update successful!', 'OK', {
            duration: 3000,
            horizontalPosition: 'left'
          });
        });
      } else {
        console.log('Dialog canceled');
      }
    });
  }


}
