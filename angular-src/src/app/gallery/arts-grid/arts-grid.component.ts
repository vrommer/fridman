import {Component, OnInit, OnDestroy, HostListener, Input} from '@angular/core';
import {AppControlService} from '../../core/services/app-control.service';
import {ArtWork} from '../../core/model/art-work';
import {ArtsService} from '../../core/services/arts.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Subscription, timer} from 'rxjs/index';
import {DataService} from './Services/data.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

// Globals
@Component({
  selector: 'mf-arts-grid',
  templateUrl: './arts-grid.component.html',
  styleUrls: ['./arts-grid.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 })),
      ])
    ])
  ]
})

export class ArtsGridComponent implements OnInit, OnDestroy {

  @Input() category: string;
  private _color: ThemePalette = 'primary';
  private _mode: ProgressSpinnerMode = 'indeterminate';
  private _value = 50;
  private _fetchingData = false;
  private _dataSubscription: Subscription;
  private _moreDataSubscription: Subscription;
  private _sources: ArtWork[];
  private _sourcesGrid: ArtWork[][];
  private _fnGetData: Function;
  private _cache: Map<string, ArtWork[]>;
  private _page = 1;
  private _lastPage = false;

  @HostListener('window:wheel', ['$event'])
  onScroll(event) {
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    const lastNPics = window.scrollY > maxScrollY - (maxScrollY / this._page);
    if (!this._lastPage && lastNPics) {
      // TODO: Check if new data received and only then increase page.
      this.fnGetData();
    }
  }

  constructor(private control: AppControlService,
              private artService: ArtsService,
              private dataService: DataService
  ) {
  }

  ngOnInit() {
    let lastId;
    let lastIndex = 0;
    this.cache = new Map<string, ArtWork[]>();
    this.sources = null;
    this.grid = null;
    this._fnGetData = () => {
      if (this._fetchingData) {
        return;
      }
      if (!['drawings', 'calligraphy', 'sculptures'].includes(this.category)) {
        return;
      }
      this._fetchingData = true;
      this.dataService.getArtifacts(this.category, lastId).subscribe((r: Array<any>) => {
        this._fetchingData = false;
        if (!r || !r.length) {
          this._lastPage = true;
          return;
        }
        const newSources = this.artService.convertToArtItems(r),
            newSourcesGrid = this.artService.createSourcesGrid(newSources);
        lastId = r[r.length - 1]._id;
        if (this.sources) {
          this.sources = [...this.sources, ...newSources];
          this.page++;
          for (let colIndex = 0; colIndex < this.grid.length; colIndex++) {
            for (const artsItem of newSourcesGrid[colIndex]) {
              this.grid[colIndex].push(artsItem);
            }
          }
        } else {
          this.sources = newSources;
          this.grid = newSourcesGrid;
        }

        timer(650).subscribe(() => {
          for (let sourceIndex = lastIndex; sourceIndex < this.sources.length; sourceIndex++) {
            this.sources[sourceIndex].showItem = true;
          }
          lastIndex = this.sources.length;
        });

        this.control.provideData(this.sources);
      });
    };
    this.page = 1;
    this.fnGetData();

    this._dataSubscription = this.control.dataRequested$.subscribe(() => {
      this.control.provideData(this.sources);
    });

    this._moreDataSubscription = this.control.moreDataRequested$.subscribe(() => {
      // this.page++;
      this.fnGetData();
    });
  }

  ngOnDestroy(): void {
    // this.routeSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
    this.moreDataSubscription.unsubscribe();
  }

  // ---------------------- GETTER/SETTER -----------------------

  get color() {
    return this._color;
  }

  get mode() {
    return this._mode;
  }

  get value() {
    return this._value;
  }

  get dataSubscription() {
    return this._dataSubscription;
  }

  get moreDataSubscription() {
    return this._moreDataSubscription;
  }

  get sources() {
    return this._sources;
  }

  get grid() {
    return this._sourcesGrid;
  }

  get fnGetData() {
    return this._fnGetData;
  }

  get cache() {
    return this._cache;
  }

  get page() {
    return this._page;
  }

  get fetchingData() {
    return this._fetchingData;
  }

  set sources(val) {
    this._sources = val;
  }

  set grid(val) {
    this._sourcesGrid = val;
  }

  set cache(val) {
    this._cache = val;
  }

  set page(val) {
    this._page = val;
  }

  onImageLoaded() {
    console.log('Loaded!');
  }

  showDetails(event) {
    // get the id to get
    const id = event.target.getAttribute('id');
    // show details
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden');
    this.control.requestDetails({
      sources: this.sources,
      itemId: id
    });
  }
}
