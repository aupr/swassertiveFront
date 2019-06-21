import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs/index';
import {catchError, map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private gs: GlobalService,
    private http: HttpClient,
    private router: Router
  ) { }

  signIn(pdt: any): Observable<any> {
    return this.http.post(this.gs.apiServerStaticUrl + 'auth/in', pdt);
  }

  signOut(): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'auth/out');
  }

  isSignedIn(): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'auth/guard').pipe(
      map(
        sc => {
          console.warn('user verified as authentic!');
          return sc;
        },
        fl => {
          return false;
        }
      ),
      catchError(err => {
        if (err.status === 401) {
          console.error('authentication denied!');
          this.router.navigate(['/signin']);
        }
        return of(false);
      })
    );
  }


  getUserData(): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'auth/user').pipe(
      catchError(err => {
        if (err.status === 401) {
          console.error('user authentication denied!');
          this.router.navigate(['/signin']);
        }
        return of(false);
      })
    );
  }


}
