import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../services/global.service';

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private gs: GlobalService
  ) { }

  ngOnInit() {
  }

}
