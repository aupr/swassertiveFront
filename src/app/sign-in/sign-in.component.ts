import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login(pdt: any): void {
    this.authService.logIn(pdt).subscribe(result => console.log(result));
  }

  loadingToggle() {
    this.isLoading = !this.isLoading;
  }
}
