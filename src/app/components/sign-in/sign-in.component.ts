import {Component, OnInit, Renderer2} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {Router} from '@angular/router';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  hide = true;
  isLoading = false;
  signInFailed = false;

  loginData = {
    username: '',
    password: ''
  };

  matcher = {
    isErrorState: () => {
      return this.signInFailed; // return boolean status value
    },
    errorMessage: 'Sign in failed due to invalid input!'
  };

  constructor(
    private gs: GlobalService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.gs.userData = null;

    const element1 = this.renderer.selectRootElement('#input_1');
    setTimeout(() => element1.focus(), 200);
  }

  focusInput2() {
    const element2 = this.renderer.selectRootElement('#input_2');
    setTimeout(() => element2.focus(), 0);
  }

  signIn(pdt: any): void {
    this.isLoading = true;
    this.authService.signIn(pdt).subscribe(res => {
      if (res.status === 'success') {
        this.router.navigate(['/home']);
      } else {
        this.isLoading = false;
        this.signInFailed = true;
        console.error('Sign in failed!');
      }
    });
  }

  loadingToggle() {
    this.isLoading = !this.isLoading;
  }
}
