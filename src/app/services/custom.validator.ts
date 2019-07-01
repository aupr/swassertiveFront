import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs/index';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {debounceTime, map, take} from 'rxjs/internal/operators';

export class CustomValidator {

  static uniqueUsername(dataService: DataService) {
    return (control: AbstractControl): Observable<{[Index: string]: any} | null > => {
      return dataService.isUsernameAvailable(control.value).pipe(
        debounceTime(500),
        take(1),
        map(sc => {
        if (sc === true) {
          return {uniqueUsername: true};
        } else {
          return null;
        }
      }, fl => {
        console.log(fl);
        return null;
      }));
    };
  }

  static uniqueBaseName(dataService: DataService) {
    return (control: AbstractControl): Observable<{[Index: string]: any} | null > => {
      return dataService.isAppBaseNameAvailable(control.value).pipe(
        debounceTime(500),
        take(1),
        map(sc => {
          if (sc === true) {
            return {uniqueBaseName: true};
          } else {
            return null;
          }
        }, fl => {
          console.log(fl);
          return null;
        }));
    };
  }

}
