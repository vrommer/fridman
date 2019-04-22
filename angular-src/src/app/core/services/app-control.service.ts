import { Injectable } from '@angular/core';
import { Subject } from "rxjs/index";
import {ArtWork} from "../model/art-work";

@Injectable({
  providedIn: 'root'
})
export class AppControlService {
  // Observable string sources
  private detailsRequestedSource = new Subject<ArtWork>();

  // Observable string streams
  detailsRequested$ = this.detailsRequestedSource.asObservable();

  // Service message commands
  requestDetails(item: ArtWork) {
    this.detailsRequestedSource.next(item);
  }
}
