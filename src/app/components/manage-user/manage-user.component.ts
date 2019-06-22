import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  users: any;
  displayedColumns: string[] = ['username', 'name'];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.dataService.getAllUsers().subscribe(sc => {

      this.users = sc;
      console.log(this.users);
    });
  }

}
