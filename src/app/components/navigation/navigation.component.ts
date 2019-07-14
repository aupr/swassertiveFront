import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private gs: GlobalService
  ) { }

  navBarData: any;

  ngOnInit() {
    // if user data is not present in the global service then fetch it and store to the global service
    if (!this.gs.userData) {
      this.authService.getUserData().subscribe(user => {
        // console.log(user);
        this.gs.userData = user;
        this.navBarData = this.gs.userData;
      });
    } else {
      this.navBarData = this.gs.userData;
    }
  }

  signOut(): void {
    this.authService.signOut().subscribe(sc => {
      console.warn('signed out... navigating to signin...');
      this.router.navigate(['/signin']);
    }, fl => {
      document.cookie = 'SWASESS=; Max-Age=-99999999;';
      this.router.navigate(['/signin']);
    });
  }

}
