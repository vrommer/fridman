import {Component, OnInit, ViewChild} from '@angular/core';
import {AppControlService} from "./core/services/app-control.service";
import {ArtWork} from "./core/model/art-work";
import {animate, style, transition, trigger} from "@angular/animations";
import {interval, Observable, timer} from "rxjs/index";
import {take} from "rxjs/internal/operators";
import {Router} from "@angular/router";
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
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity:0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit{

  @ViewChild(HeaderComponent) header;

  ngOnInit(): void {
    interval(650).pipe(
      this.countTwoIntervals()
    ).subscribe(val => {
      if (val === 1) this.showHeader = true;
      else if (val === 2) {
        this.showGrid = true;
        this.control.showArts(true);
      }
    });
    this.control.detailsRequested$.subscribe(artWork => {
      if (artWork) this.header.fixedHeader = false;
      this.requestedItem = artWork;
      this.showDetails = !!artWork;
    });
    this.control.categoryChanged$.subscribe(this.onCategoryChange.bind(this));
  }

  private _showDetails:boolean = false;
  private _showHeader:boolean = false;
  private _showGrid:boolean = true;
  public requestedItem:ArtWork;

  constructor(private control:AppControlService,
    private router: Router)
  {
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

  countTwoIntervals = () => (source: Observable<any>) =>
    new Observable(observer => {
      let count = 0;
      return source.pipe(take(2)).subscribe({
        next() {
          count++;
          observer.next(
            count
          );
        },
        error(err) { observer.error(err); },
        complete() { observer.complete(); }
    });
  });

  onCategoryChange(newCategory:string) {
    this.control.showArts(false);

    timer(300).subscribe(() => {
      this.router.navigate([`/${newCategory}`]);
    });
    timer(650).subscribe(() => {
      this.control.showArts(true);
    });
  }
}
