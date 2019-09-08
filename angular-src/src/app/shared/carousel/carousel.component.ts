import {
  AfterContentInit, Component, ContentChildren, Input,
  QueryList, Output, EventEmitter, AfterViewInit, ViewChild
} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";
import {CarouselMode} from "./carousel-utils/carousel-mode";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons/faAngleRight";
import {Subject} from "rxjs/index";

@Component({
  selector: 'mf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, AfterContentInit {
  @Output() fewItemsLeft: EventEmitter<any> = new EventEmitter();
  @Output() currentItem: EventEmitter<number> = new EventEmitter<number>();

  @Input() viewMode: CarouselMode = CarouselMode.manual;
  @Input() pointer: number;
  @Input() delay: number;
  @ContentChildren(CarouselItemComponent) items: QueryList<CarouselItemComponent>;

  private _lastFewPages = 5;

  itemsArray: CarouselItemComponent[];

  leftIcon = faAngleLeft;
  rightIcon = faAngleRight;

  constructor() {

  }

  ngAfterViewInit(): void {
    if (this.pointer === 0) {

    }
  }

  ngAfterContentInit(): void {
    this.itemsArray = this.items.toArray();
    this.items.changes.subscribe(() => {
      this.itemsArray = this.items.toArray();
    })
  }

  private showNextItemAuto = () => {
    this.nextItem();
    this.nextItemAuto();
  };

  private nextItemAuto = () => {
    setTimeout(this.showNextItemAuto, this.delay);
  };

  public nextItem = () => {
    if (this.itemsArray && this.itemsArray.length && this.pointer < (this.items.length - 1)) {
      this.itemsArray[this.pointer].hide();
      this.pointer++;
      this.currentItem.emit(this.pointer);
      this.itemsArray[this.pointer].show();

      if ((this.itemsArray.length - this.pointer) <= this._lastFewPages) {
        this.fewItemsLeft.emit(null);
      }
    }
  };

  public previousItem = () => {
    if (this.itemsArray && this.itemsArray.length && this.pointer > 0) {
      this.itemsArray[this.pointer].hide();
      this.pointer--;
      if (this.pointer < 0){
        this.pointer = this.items.length + this.pointer;
      }
      this.itemsArray[this.pointer].show();
    }
  };

  public isNextBtnHoverable() {
    return this.pointer < (this.itemsArray.length - 1);
  }

  public isPrevBtnHoverable() {
    return this.pointer > 0;
  }

}
