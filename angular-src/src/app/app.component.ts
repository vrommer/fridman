import {Component, OnInit, ViewChild} from '@angular/core';
import {AppControlService} from "./core/services/app-control.service";
import {ArtWork} from "./model/art-work";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {interval, timer} from "rxjs/index";
import {bufferCount, count, map, take} from "rxjs/internal/operators";
import {counter} from "@fortawesome/fontawesome-svg-core";
import {HeaderComponent} from "./header/header.component";
import {Router} from "@angular/router";

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
    ]),
    trigger('showHideGrid', [
      state('shown', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('shown <=> hidden', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    timer(1000).subscribe(() => this.showGrid = true)
    timer(1000).subscribe(() =>  {
      this.showHeader = true
    });
    this.control.detailsRequested$.subscribe(artWork => {
      this.requestedItem = artWork;
      this.showDetails = !!artWork;
    });
  }

  private _showDetails:boolean = false;
  private _showHeader:boolean = false;
  private _showGrid:boolean = false;
  public requestedItem:ArtWork;

  constructor(private control:AppControlService,
    private router: Router) {
  }

  get showGrid() {
    return this._showGrid;
  }

  set showGrid(val) {
    this._showGrid = val;
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

  onCategoryChange(newCategory:String) {
    this.showGrid = false;
    this.control.changeArtsCategory(newCategory);
    timer(1000).subscribe(() => {
      this.router.navigate([`/${newCategory}`]);
      this.showGrid = true;
    });
  }
}
