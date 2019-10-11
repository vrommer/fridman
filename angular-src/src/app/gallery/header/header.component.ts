import {Component, HostListener, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('showHideFixedHeader', [
      transition(':enter', [
        style({ top: -40 }),
        animate('0.3s', style({ top: 0 }))
      ]),
      transition(':leave', [
        animate('0.1s', style({ top: -40 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  private _fixedHeader: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.showFixedHeader();
  }

  get fixedHeader() {
    return this._fixedHeader;
  }

  set fixedHeader(val:boolean) {
    this._fixedHeader = val;
  }

  showFixedHeader() {
    if (window.pageYOffset > 300) {
      if (!this.fixedHeader) this.fixedHeader = true;
    }
    else if (window.pageYOffset < 200){
      if (this.fixedHeader) this.fixedHeader = false;
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
