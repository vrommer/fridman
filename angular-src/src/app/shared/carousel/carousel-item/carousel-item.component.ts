import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'mf-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity:1 })),
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity:0 }))
      ]),
    ])
  ]
})
export class CarouselItemComponent implements OnInit {

  @Input() display:number;

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
    this._hidden = !this.display;
    // this.hide();
  }
}
