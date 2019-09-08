import { Component, OnInit } from '@angular/core';
import { HeaderModel } from '../header/header-model';
import {computeStyle} from "@angular/animations/browser/src/util";

@Component({
  selector: 'mf-calligraphy',
  template: `
    <mf-arts-grid [category]="'calligraphy'"></mf-arts-grid>
  `,
  styles: []
})
export class CalligraphyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
