import {Component} from '@angular/core';
import {AppControlService} from "./core/services/app-control.service";
import {ArtWork} from "./model/art-work";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('showHideDetails', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity:0 }))
      ])
    ])
  ]
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
