import { Injectable } from '@angular/core';
import { Subject } from "rxjs/index";
import {ArtWork} from "../../model/art-work";

@Injectable({
  providedIn: 'root'
})
export class AppControlService {
  // Observable string sources
  private detailsRequestedSource = new Subject<ArtWork>();
  private artsCategoryChanged = new Subject<string>();
  private showArtsRequested = new Subject<boolean>();

  // Observable string streams
  detailsRequested$ = this.detailsRequestedSource.asObservable();
  categoryChanged$ = this.artsCategoryChanged.asObservable();
  artsShowing$ = this.showArtsRequested.asObservable();

  // Service message commands
  requestDetails(item: ArtWork) {
    this.detailsRequestedSource.next(item);
  }

  changeArtsCategory(category: string) {
    this.artsCategoryChanged.next(category);
  }

  showArts(value: boolean) {
    this.showArtsRequested.next(value);
  }
}
