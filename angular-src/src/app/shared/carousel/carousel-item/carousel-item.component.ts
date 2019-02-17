import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {timeout} from "rxjs/internal/operators";

@Component({
  selector: 'mf-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0s', style({ opacity:0 }))
      ]),
    ])
  ]
})
export class CarouselItemComponent implements OnInit {

  _hidden: boolean;

  get isHidden(): boolean {
    return this._hidden;
  }

  public hide() {
    this._hidden = true;
  }

  public show() {
    this._hidden = false;
  }

  public showNew() {
    this._hidden = false;
  }

  toggle() {
    this._hidden = !this._hidden;
  }

  constructor() {
  }

  ngOnInit() {
    this.hide();
  }

}
