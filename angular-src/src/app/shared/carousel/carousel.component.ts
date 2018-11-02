import {
  AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit,
  QueryList
} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";
import {CarouselMode} from "./carousel-utils/carousel-mode";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons/faAngleRight";

@Component({
  selector: 'mf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @Input() viewMode: CarouselMode = CarouselMode.manual;
  @Input() delay: number;
  @ContentChildren(CarouselItemComponent) items: QueryList<CarouselItemComponent>;

  private pointer: number;
  private showing: boolean;
  itemsArray: CarouselItemComponent[];

  leftIcon = faAngleLeft;
  rightIcon = faAngleRight;

  mutationObserver: MutationObserver;

  constructor(private el: ElementRef) {
    this.pointer = -1;
    let config = { attributes: true, childList: true, subtree: true };
    // Track changes of elements length
    this.mutationObserver = new MutationObserver(() => {
      this.itemsArray = this.items.toArray();
      if (!this.showing){
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
      this.showing = true;
      if (this.pointer >= 0){
        this.itemsArray[this.pointer].hide();
      }
      this.pointer = ( this.pointer + 1 ) % this.items.length;
      this.itemsArray[this.pointer].show();
    } else {
      this.showing = false;
      this.pointer = -1;
    }
  };

  public previousItem = () => {
    if (this.showing) {
      this.itemsArray[this.pointer].hide();
      this.pointer--;
      if (this.pointer < 0){
        this.pointer = this.items.length + this.pointer;
      }
      this.itemsArray[this.pointer].show();
    }
  };
}
