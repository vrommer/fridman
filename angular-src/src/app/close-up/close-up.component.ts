import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArtWork} from "../model/art-work";
import {ArtsService} from "../core/services/arts.service";
import {CarouselMode} from "../shared/carousel/carousel-utils/carousel-mode";

@Component({
  selector: 'mf-close-up',
  templateUrl: './close-up.component.html',
  styleUrls: ['./close-up.component.scss']
})
export class CloseUpComponent implements OnInit {
  @Input() requestedItem:ArtWork;
  private _carouselMode: CarouselMode = CarouselMode.manual;
  private _sources:ArtWork[];
  private _apiUrl:string;

  get carouselMode() {
    return this._carouselMode;
  }

  get sources() {
    return this._sources;
  }

  constructor(private httpClient:HttpClient,
              private artsService:ArtsService
  ) { }

  ngOnInit() {
    console.log(this.requestedItem);
    this._apiUrl = 'http://localhost:3000/api';
    this.getArtifactsPaths(this.requestedItem.type).subscribe(r => {
        this._sources = this.artsService.convertToArtItems(r);
      }
    );
  }

  getArtifactsPaths(type:string) {
    return this.httpClient.jsonp(`${this._apiUrl}/${type}/${this.requestedItem.name}`, 'callback');
  }

}