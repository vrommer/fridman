import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppControlService} from "../core/services/app-control.service";
import {ArtWork} from "../core/model/art-work";
import {ArtsService} from "../core/services/arts.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {filter} from "rxjs/internal/operators";
import {timer} from "rxjs/index";

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

  constructor(private route: ActivatedRoute,
              private httpClient:HttpClient,
              private control:AppControlService,
              private artService:ArtsService
  ) {
  }

  ngOnInit() {
    this._apiUrl = 'http://localhost:3000/api';
    this.route.params.subscribe( p => {
      this._type = p.param;
      this.getArtifacts(p.param).subscribe(r => {
        this._sources = this.artService.convertToArtItems(r);
        this._sourcesGrid = this.artService.createSourcesGrid(this._sources);
        timer(650).subscribe(() => {
          for (let source of this._sources) source.showItem = true;
        });
      });
    });
    timer(650).subscribe(() => {
      for (let source of this._sources) source.showItem = true;
    });
  }

  ngOnDestroy(): void {
  }

  // ---------------------- GETTER/SETTER -----------------------

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

  getArtifacts(type:string) {
    let inputParam = type ? type : "drawings";
    return this.httpClient.jsonp(`${this._apiUrl}/${inputParam}`, 'callback');
  }

}
