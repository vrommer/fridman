import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppControlService} from "../../core/services/app-control.service";
import {ArtWork} from "../../core/model/art-work";
import {ArtsService} from "../../core/services/arts.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {timer} from "rxjs/index";
import {DataService} from "./Services/data.service";

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

  private _sources: ArtWork[];
  private _sourcesGrid: ArtWork[][];
  private _apiUrl: string;
  private _type: string;
  private _fnGetData: Function;
  private _cache: Map<string, ArtWork[]>;
  private _page = 1;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if ((window.innerHeight + window.scrollY) > (document.body.offsetHeight - (document.body.offsetHeight/this._page))) {
      this.page++;
      this.fnGetData(this.category);
    }
  }

  constructor(private route: ActivatedRoute,
              private control:AppControlService,
              private artService:ArtsService,
              private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.apiUrl = 'http://localhost:3000/api';
    this.cache = new Map<string, ArtWork[]>();
    this.route.params.subscribe( p => {
      this.sources = null;
      this.grid = null;
      this.category = p.param;
      this.fnGetData = this.retrieveGetDataFunction();
      this.fnGetData(this.category);
      this.page = 1;
    });

    this.control.dataRequested$.subscribe(() => {
      this.control.provideData(this.sources);
    });

    this.control.moreDataRequested$.subscribe(() => {
      console.log("Requesting more data");
      this.page++;
      this.fnGetData(this.category);
    })
  }

  ngOnDestroy(): void {
  }

  // ---------------------- GETTER/SETTER -----------------------

  get sources() {
    return this._sources;
  }

  get grid() {
    return this._sourcesGrid;
  }

  get apiUrl() {
    return this._apiUrl;
  }

  get category() {
    return this._type;
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

  set sources(val) {
    this._sources = val;
  }

  set grid(val) {
    this._sourcesGrid = val;
  }

  set apiUrl(val) {
    this._apiUrl = val;
  }

  set category(val) {
    this._type = val;
  }

  set fnGetData(val) {
    this._fnGetData = val;
  }

  set cache(val) {
    this._cache = val;
  }

  set page(val) {
    this._page = val;
  }

  retrieveGetDataFunction() {
    let lastId,
        lastIndex = 0,
        fetchingData = false;
    return function(type) {
      if (fetchingData) {
        return;
      }
      fetchingData = true;
      this.dataService.getArtifacts(type, lastId).subscribe(r => {
        if (!r || !r.length) {
          return;
        }
        let newSources = this.artService.convertToArtItems(r),
            newSourcesGrid = this.artService.createSourcesGrid(newSources);
        lastId = r[r.length - 1]._id;
        if (this.sources) {
          this.sources = [...this.sources, ...newSources];
          for (let colIndex = 0; colIndex < this.grid.length; colIndex++) {
            for (let artsItem of newSourcesGrid[colIndex]) {
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
          fetchingData = false;
        });

        this.control.provideData(this.sources);
      });
    }
  }

  onImageLoaded() {
    console.log("Loaded!");
  }

  showDetails(event) {
    event.stopPropagation();
    // get the id to get
    let id = event.target.getAttribute("id");
    // show details
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow: hidden");
    this.control.requestDetails({
      sources: this.sources,
      itemId: id
    });
  }
}
