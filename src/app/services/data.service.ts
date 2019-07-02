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
    return this.http.get(this.gs.apiServerStaticUrl + 'base/user').pipe(
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
    return this.http.get(this.gs.apiServerStaticUrl + 'base/app').pipe(
      catchError(err => {
        if (err.status === 401) {
          console.error('authentication denied!');
          this.router.navigate(['/badrequest']);
        }
        return of(false);
      })
    );
  }

  getAppById(id: string): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'base/app&id=' + id).pipe(
      catchError(err => {
        if (err.status === 401) {
          console.error('authentication denied!');
          this.router.navigate(['/badrequest']);
        }
        return of(false);
      })
    );
  }

  updateApp(appData: any): Observable<any> {
    return this.http.put(this.gs.apiServerStaticUrl + 'base/app', appData);
  }

  createNewUser(userData: any): Observable<any> {
    return this.http.post(this.gs.apiServerStaticUrl + 'base/user', userData);
  }

  getAllLevels(): Observable<any> {
    return this.http.get(this.gs.apiServerStaticUrl + 'base/level');
  }

  isUsernameAvailable(un: string): Observable<any> {
    const pdt = {
      username: un
    }
    return this.http.post(this.gs.apiServerStaticUrl + 'check/username', pdt);
  }

  isAppBaseNameAvailable(un: string): Observable<any> {
    const pdt = {
      basename: un
    }
    return this.http.post(this.gs.apiServerStaticUrl + 'check/appbasename', pdt);
  }

  createNewApp(appData: any): Observable<any> {
    return this.http.post(this.gs.apiServerStaticUrl + 'base/app', appData);
  }


}
