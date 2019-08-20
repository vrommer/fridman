import { Component, OnInit } from '@angular/core';
import { HeaderModel } from '../header/header-model';

@Component({
  selector: 'mf-sculptures',
  template: `
    <mf-arts-grid [category]="'sculptures'"></mf-arts-grid>    
  `,
  styles: []
})
export class SculpturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
