import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {HeaderComponent} from "./header/header.component";
import {AppControlService} from "../core/services/app-control.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/internal/operators";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'mf-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
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
export class GalleryComponent implements OnInit, OnDestroy {

  @ViewChild(HeaderComponent) header;

  private _showDetails:boolean = false;
  private _showHeader:boolean = false;
  private _routerSubscription:Subscription;
  private _detailsRequestedSubscription:Subscription;
  public requestedItemId:string;
  public sources:any;

  constructor(private control:AppControlService,
              private router:Router)
  {
    this._routerSubscription = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => { if ((e as NavigationEnd).url === '/gallery') this.router.navigateByUrl('/gallery/drawings') });
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

  ngOnInit(): void {
    this.showHeader = true;
    this._detailsRequestedSubscription = this.control.detailsRequested$.subscribe(oData => {
      if (oData){
        this.header.fixedHeader = false;
        this.requestedItemId = oData.itemId;
        this.sources = oData.sources;
      }
      this.showDetails = !!oData;
    });
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
    this._detailsRequestedSubscription.unsubscribe();
  }
}
