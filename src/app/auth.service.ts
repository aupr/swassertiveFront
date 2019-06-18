import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost/swassertive/?api=';

  constructor(
    private http: HttpClient
  ) { }

  logIn(pdt: any): Observable<any> {
    console.log(pdt);
    return this.http.post(this.url + 'login', pdt);
  }

}
