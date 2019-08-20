import { Component, OnInit } from '@angular/core';
import { HeaderModel } from '../header/header-model';

@Component({
  selector: 'mf-drawings',
  template: `
    <mf-arts-grid [category]="'drawings'"></mf-arts-grid>
  `,
  styles: []
})
export class DrawingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
