import {
  AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit,
  QueryList
} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";
import {CarouselMode} from "./carousel-utils/carousel-mode";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons/faAngleRight";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'mf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input() viewMode: CarouselMode = CarouselMode.manual;
  @Input() delay: number;
  @ContentChildren(CarouselItemComponent) items: QueryList<CarouselItemComponent>;

  private _pointer: number;
  private _showing: boolean;

  get showing() {
    return this._showing;
  }

  itemsArray: CarouselItemComponent[];

  leftIcon = faAngleLeft;
  rightIcon = faAngleRight;

  mutationObserver: MutationObserver;

  constructor(private el: ElementRef) {
    this._pointer = -1;
    let config = { attributes: true, childList: true, subtree: true };
    // Track changes of elements length
    this.mutationObserver = new MutationObserver(() => {
      this.itemsArray = this.items.toArray();
      if (!this._showing){
        this.nextItem();
      }
    });
    this.mutationObserver.observe(this.el.nativeElement, config)
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.viewMode === CarouselMode.automatic) {
      this.nextItemAuto();
    } else if (this.viewMode === CarouselMode.manual) {
      this.nextItem();
    }
  }

  private showNextItemAuto = () => {
    this.nextItem();
    this.nextItemAuto();
  };

  private nextItemAuto = () => {
    setTimeout(this.showNextItemAuto, this.delay);
  };

  public nextItem = () => {
    if (this.itemsArray && this.itemsArray.length) {
      this._showing = true;
      // If no item has been displayed yet
      if (this._pointer < 0) {
        this._pointer = 0;
        this.itemsArray[this._pointer].showNew();
      }
      else {
        this.itemsArray[this._pointer].hide();
        this._pointer = ( this._pointer + 1 ) % this.items.length;
        this.itemsArray[this._pointer].show();
      }
    } else {
      this._showing = false;
      this._pointer = -1;
    }
  };

  public previousItem = () => {
    if (this._showing) {
      this.itemsArray[this._pointer].hide();
      this._pointer--;
      if (this._pointer < 0){
        this._pointer = this.items.length + this._pointer;
      }
      this.itemsArray[this._pointer].show();
    }
  };
}
