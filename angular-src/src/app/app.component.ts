import {Component} from '@angular/core';
import {AppControlService} from "./core/services/app-control.service";
import {ArtWork} from "./model/art-work";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {interval, timer} from "rxjs/index";
import {bufferCount, count, map, take} from "rxjs/internal/operators";
import {counter} from "@fortawesome/fontawesome-svg-core";

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
    ]),
    trigger('showHideHeader', [
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
  public showHeader:boolean = false;
  public requestedItem:ArtWork;

  constructor(private control:AppControlService) {
    timer(1000).subscribe(() =>  {
      this.showHeader = true
    });
    this.control.detailsRequested$.subscribe(artWork => {
      this.requestedItem = artWork;
      this.showDetails = !!artWork;
    });
  }
}
