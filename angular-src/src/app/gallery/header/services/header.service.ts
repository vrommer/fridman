import { Injectable } from '@angular/core';
import {Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private routeChanged = new Subject<string>();

  constructor() { }

  // Observable string streams
  routeChanged$ = this.routeChanged.asObservable();

  // Service message commands
  changeRoute(newRoute: string) {
    this.routeChanged.next(newRoute);
  }
}
