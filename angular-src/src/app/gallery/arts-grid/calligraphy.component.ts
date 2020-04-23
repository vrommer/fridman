import { Component, OnInit } from '@angular/core';

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
