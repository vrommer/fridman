import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mf-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  hidden: Boolean;

  hide() {
    this.hidden = true;
  }

  public show() {
    this.hidden = false;
  }

  toggle() {
    this.hidden = !this.hidden;
  }

  constructor() {
  }

  ngOnInit() {
    this.hide();
  }

}
