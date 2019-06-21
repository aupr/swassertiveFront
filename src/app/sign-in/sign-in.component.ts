import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
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
    });
  }

  loadingToggle() {
    this.isLoading = !this.isLoading;
  }
}
