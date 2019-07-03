import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  apiServerStaticUrl = 'http://localhost/swassertive/?api=';

  userData: any;

  isLoading: boolean;
}
