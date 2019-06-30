import { Injectable } from '@angular/core';
import {GlobalService} from './global.service';
import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private gs: GlobalService,
    private router: Router,
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'read/user').pipe(
      catchError(err => {
        if (err.status === 401) {
          console.error('authentication denied!');
          this.router.navigate(['/badrequest']);
        }
        return of(false);
      })
    );
  }

  getAllApps(): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'read/app').pipe(
      catchError(err => {
        if (err.status === 401) {
          console.error('authentication denied!');
          this.router.navigate(['/badrequest']);
        }
        return of(false);
      })
    );
  }

  createNewUser(userData: any): Observable<any> {
    return this.http.post(this.gs.apiServerStaticUrl + 'write/user', userData);
  }

  getAllLevels(): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'read/level');
  }

  isUsernameAvailable(un: string): Observable<any> {
    const pdt = {
      username: un
    }
    return this.http.post(this.gs.apiServerStaticUrl + 'read/checkusername', pdt);
  }

  createNewApp(appData: any): Observable<any> {
    return this.http.post(this.gs.apiServerStaticUrl + 'write/app', appData);
  }


}
