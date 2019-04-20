import { Injectable } from '@angular/core';
import { Subject } from "rxjs/index";
import {ArtWork} from "../../model/art-work";

@Injectable({
  providedIn: 'root'
})
export class AppControlService {
  // Observable string sources
  private detailsRequestedSource = new Subject<ArtWork>();
  private artsCategoryChanged = new Subject<String>();

  // Observable string streams
  detailsRequested$ = this.detailsRequestedSource.asObservable();
  categoryChanged$ = this.artsCategoryChanged.asObservable();

  // Service message commands
  requestDetails(item: ArtWork) {
    this.detailsRequestedSource.next(item);
  }

  changeArtsCategory(category: String) {
    this.artsCategoryChanged.next(category);
  }
}
