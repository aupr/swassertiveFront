import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {Router} from '@angular/router';
import {DialogChangePasswordComponent} from '../../dialog/dialog-change-password/dialog-change-password.component';
import {MatDialog} from '@angular/material';

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private gs: GlobalService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }


  changePassword() {



    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '450px',
      panelClass: 'userViewModal',
      data: this.gs.userData.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updating password');

      } else {
        console.log('Dialog canceled');
      }
    });
  }

}
