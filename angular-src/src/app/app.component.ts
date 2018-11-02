import {Component} from '@angular/core';
import {AppControlService} from "./core/services/app-control.service";
import {ArtWork} from "./model/art-work";

@Component({
  selector: 'mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showDetails:boolean = false;
  public requestedItem:ArtWork;

  constructor(private control:AppControlService) {
    this.control.detailsRequested$.subscribe(artWork => {
      this.requestedItem = artWork;
      this.showDetails = !!artWork;
    });
  }
}
