import { Injectable } from '@angular/core';
import {GlobalService} from './global.service';
import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';

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
}
