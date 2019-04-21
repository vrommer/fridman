import {Component, HostListener, OnInit} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('showHideFixedHeader', [
      transition(':enter', [
        style({ top: -40 }),
        animate('0.4s', keyframes([
          style({ top: -20, offset: 0.2 }),
          style({ top: -10, offset: 0.3 }),
          style({ top: -5, offset: 0.4 }),
          style({ top: 0, offset: 1 })
        ])),
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
    if (window.pageYOffset > 300) {
      if (!this.fixedHeader) this.fixedHeader = true;
    }
    else if (window.pageYOffset < 200){
      if (this.fixedHeader) this.fixedHeader = false;
    }
  }

  get fixedHeader() {
    return this._fixedHeader;
  }

  set fixedHeader(val:boolean) {
    this._fixedHeader = val;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
