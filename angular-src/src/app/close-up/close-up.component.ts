import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'mf-close-up',
  templateUrl: './close-up.component.html',
  styleUrls: ['./close-up.component.scss']
})
export class CloseUpComponent implements OnInit {
  public sources: string[];
  private apiUrl: string;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.apiUrl = 'http://localhost:3000/api';
    this.getArtifactsPaths("drawings").subscribe(r => {
        this.sources = r as string[];
      }
    );
  }

  getArtifactsPaths(type:string) {
    return this.httpClient.jsonp(`${this.apiUrl}?param=${type}`, 'callback');
  }

}
