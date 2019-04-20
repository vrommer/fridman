import {Component, HostListener, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppControlService} from "../core/services/app-control.service";
import {ArtWork} from "../model/art-work";
import {ArtsService} from "../core/services/arts.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {timer} from "rxjs/index";

// Globals

@Component({
  selector: 'mf-arts-grid',
  templateUrl: './arts-grid.component.html',
  styleUrls: ['./arts-grid.component.scss'],
  animations: [
    trigger('showHideGrid', [
      state('shown', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('shown <=> hidden', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class ArtsGridComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private httpClient:HttpClient,
              private control:AppControlService,
              private artService:ArtsService
  ) {
  }

  ngOnDestroy(): void {
  }

  private _sources: ArtWork[];
  private _sourcesGrid: ArtWork[][];
  private _apiUrl: string;
  private _type: string;
  private _showGrid:boolean = false;

  // ---------------------- GETTER/SETTER -----------------------

  get showGrid() {
    return this._showGrid;
  }

  set showGrid(val) {
    this._showGrid = val;
  }

  get type() {
    return this._type;
  }

  get sourcesGrid() {
    return this._sourcesGrid;
  }

  // ---------------------- PRIVATE METHODS -----------------------

  findItem(id) {
    for (let s of this._sources) {
      if (s.id === id) return s;
    }
    return null;
  }

  // --------------------------------------------------------------

  @HostListener('document:keydown.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow: auto");
    this.hideDetails();
  }

  showDetails(event) {
    event.stopPropagation();
    // get the id to get
    let id = event.target.getAttribute("id");
    // find the item
    let item = this.findItem(id);
    // run requestDetails
    if (!item) return;
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow: hidden");
    this.control.requestDetails(item);
  }

  hideDetails() {
    this.control.requestDetails(null);
  }

  getArtifacts(type:string) {
    let inputParam = type ? type : "drawings";
    return this.httpClient.jsonp(`${this._apiUrl}/${inputParam}`, 'callback');
  }

  ngOnInit() {
    this._apiUrl = 'http://localhost:3000/api';
    this.route.params.subscribe( p => {
      this._type = p.param;
      this.getArtifacts(p.param).subscribe(r => {
        this._sources = this.artService.convertToArtItems(r);
        this._sourcesGrid = this.artService.createSourcesGrid(this._sources);
        timer(1000).subscribe(() => this.showGrid = true)
      });
    });
  }

}
