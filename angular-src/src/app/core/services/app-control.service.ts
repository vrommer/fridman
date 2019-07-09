import { Injectable } from '@angular/core';
import { Subject } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AppControlService {
  // Observable string sources
  private detailsRequestedSource = new Subject<any>();
  private moreDataRequestedSource = new Subject<any>();
  private dataRequest = new Subject<any>();
  private dataSource = new Subject<any>();

  // Observable string streams
  dataProvider$ = this.dataSource.asObservable();
  dataRequested$  = this.dataRequest.asObservable();
  detailsRequested$ = this.detailsRequestedSource.asObservable();
  moreDataRequested$ = this.moreDataRequestedSource.asObservable();

  // Service message commands
  requestData() {
    this.dataRequest.next();
  }

  provideData(oData) {
    this.dataSource.next(oData);
  }

  requestDetails(oData) {
    this.detailsRequestedSource.next(oData);
  }

  requestMoreData() {
    this.moreDataRequestedSource.next();
  }
}
