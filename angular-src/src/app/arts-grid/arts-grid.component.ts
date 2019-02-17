import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppControlService} from "../core/services/app-control.service";
import {ArtWork} from "../model/art-work";
import {ArtsService} from "../core/services/arts.service";

// Globals

@Component({
  selector: 'mf-arts-grid',
  templateUrl: './arts-grid.component.html',
  styleUrls: ['./arts-grid.component.scss'],
  animations: [
  ]
})
export class ArtsGridComponent implements OnInit {

  private _sources: ArtWork[];
  private _sourcesGrid: ArtWork[][];
  private _apiUrl: string;
  private _type: string;

  get type() {
    return this._type;
  }

  get sourcesGrid() {
    return this._sourcesGrid;
  }

  constructor(private route: ActivatedRoute,
              private httpClient:HttpClient,
              private control:AppControlService,
              private artService:ArtsService
  ) {
  }

  @HostListener('document:keydown.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow: auto");
    this.hideDetails();
  }

  showDetails(item:ArtWork) {
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
      });
    });
  }

}
