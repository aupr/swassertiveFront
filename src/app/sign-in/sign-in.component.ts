import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Router} from '@angular/router';

@Component({
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

  signIn(pdt: any): void {
    this.isLoading = true;
    this.authService.signIn(pdt).subscribe(res => {
      if (res.status === 'success') {
        this.router.navigate(['/home']);
      } else {
        this.isLoading = false;
        console.error('Sign in failed!');
      }
    });
  }

  loadingToggle() {
    this.isLoading = !this.isLoading;
  }
}
