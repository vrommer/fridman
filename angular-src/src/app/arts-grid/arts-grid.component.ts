import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

// Globals

@Component({
  selector: 'mf-arts-grid',
  templateUrl: './arts-grid.component.html',
  styleUrls: ['./arts-grid.component.scss'],
  animations: [
  ]
})
export class ArtsGridComponent implements OnInit {

  private sources: string[];
  private sourcesGrid: string[][];
  private apiUrl: string;

  constructor(private route: ActivatedRoute, private httpClient:HttpClient) {
  }

  getArtifactsPaths(type:string) {
    return this.httpClient.jsonp(`${this.apiUrl}?param=${type}`, 'callback');
  }

  /**
   * Convert from source string[] to a 4*X matrix of strings.
   * Each row in the matrix represents a row of image sources.
   * @param aInput
   * @returns {string[][]}
   */
  public createSourcesGrid(aInput:string[]):string[][]{
    let iColumnsCount = 4;
    let iCurrentColumn = 0;
    let aColumns = [
      [],
      [],
      [],
      []
    ];
    // Go over array
    for (let i = 0; i < aInput.length; i++) {
      // Get the correct column number
      iCurrentColumn = i % iColumnsCount;
      // Push image into column
      aColumns[iCurrentColumn].push(aInput[i]);
    }
    return aColumns;
  }

  ngOnInit() {
    this.apiUrl = 'http://localhost:3000/api';
    this.route.params.subscribe( p => {
      this.getArtifactsPaths(p.param).subscribe(r => {
          this.sources = r as string[];
          this.sourcesGrid = this.createSourcesGrid(r as string[]);
        }
      );
    });
  }

}
