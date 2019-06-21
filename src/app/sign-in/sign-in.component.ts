import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
<<<<<<< HEAD
=======
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
>>>>>>> ff6c2a85ad139a1429d5474801e21443ee0d5f96
import {Router} from '@angular/router';

@Component ({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  hide = true;
  isLoading = false;

  loginData = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

<<<<<<< HEAD
  login(pdt: any): void {
    this.authService.logIn(pdt).subscribe(result => {
      this.isLoading = true;
      if (result.status === 'success') {
        console.log('Authentic User');
        this.router.navigate(['/home']);
      } else {
        this.isLoading = false;
        console.log('User is not authenticated');
      }
    }, failResult => {
      console.log(failResult);
=======
  signIn(pdt: any): void {
    this.isLoading = true;
    this.authService.signIn(pdt).subscribe(res => {
      if (res.status === 'success') {
        this.router.navigate(['/home']);
      } else {
        this.isLoading = false;
        console.error('Sign in failed!');
      }
>>>>>>> ff6c2a85ad139a1429d5474801e21443ee0d5f96
    });
  }

  loadingToggle() {
    this.isLoading = !this.isLoading;
  }
}
