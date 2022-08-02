import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedNavService {

  public navEvent = new Subject<boolean>();

  constructor() { }


  public setState(state: boolean) {
   this.navEvent.next(state);
  }

  public getState(): Observable<boolean> {
   return this.navEvent.asObservable();
 }
}