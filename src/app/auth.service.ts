import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs/index';
import {catchError, map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost/swassertive/?api=';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signIn(pdt: any): Observable<any> {
    return this.http.post(this.url + 'signin', pdt);
  }

  signOut(): Observable<any> {
    return this.http.get(this.url + 'signout');
  }

  isSignedIn(): Observable<any> {
    return this.http.get(this.url + 'read/authguard').pipe(
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


}
