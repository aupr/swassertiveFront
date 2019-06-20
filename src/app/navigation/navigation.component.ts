import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signOut(): void {
    this.authService.signOut().subscribe(sc => {
      console.warn('signed out... navigating to signin...');
      this.router.navigate(['/signin']);
    }, fl => {
      document.cookie = 'SWASESS=; Max-Age=-99999999;';
    });
  }

}
