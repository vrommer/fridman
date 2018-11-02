import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mf-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  _hidden: boolean;

  get hidden():boolean {
    return this._hidden;
  }

  public hide() {
    this._hidden = true;
  }

  public show() {
    this._hidden = false;
  }

  toggle() {
    this._hidden = !this.hidden;
  }

  constructor() {
  }

  ngOnInit() {
    this.hide();
  }

}
