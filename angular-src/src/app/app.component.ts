import {Component, OnInit, ViewChild} from '@angular/core';
import {AppControlService} from "./core/services/app-control.service";
import {ArtWork} from "./core/model/art-work";
import {animate, style, transition, trigger} from "@angular/animations";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('showHideDetails', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity:0 }))
      ])
    ]),
    trigger('showHideHeader', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class AppComponent implements OnInit{

  @ViewChild(HeaderComponent) header;

  private _showDetails:boolean = false;
  private _showHeader:boolean = false;
  public requestedItem:ArtWork;

  constructor(private control:AppControlService)
  {
  }

  ngOnInit(): void {
    this.showHeader = true;
    this.control.detailsRequested$.subscribe(artWork => {
      if (artWork) this.header.fixedHeader = false;
      this.requestedItem = artWork;
      this.showDetails = !!artWork;
    });
  }

  get showDetails() {
    return this._showDetails;
  }

  set showDetails(val) {
    this._showDetails = val;
  }

  get showHeader() {
    return this._showHeader;
  }

  set showHeader(val) {
    this._showHeader = val;
  }
}
