import {
  AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit,
  QueryList, Renderer2
} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";

@Component({
  selector: 'mf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() delay: number;
  @ContentChildren(CarouselItemComponent) items: QueryList<CarouselItemComponent>;

  pointer: number;
  itemsArray: CarouselItemComponent[];

  mutationObserver: MutationObserver;

  constructor(private el: ElementRef) {
    let config = { attributes: true, childList: true, subtree: true };
    // Track changes of elements length
    this.mutationObserver = new MutationObserver(() => {
      this.itemsArray = this.items.toArray();
      if (!this.pointer){
        this.pointer = 0;
      }
    });
    this.mutationObserver.observe(this.el.nativeElement, config)
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.nextItem();
  }

  private showNextItem = () => {
    console.log("Showing next");
    if (this.itemsArray && this.itemsArray.length) {
      this.itemsArray[this.pointer].hide();
      this.pointer = ( this.pointer + 1 ) % this.items.length;
      this.itemsArray[this.pointer].show();
    }
    this.nextItem();
  };

  nextItem = () => {
    setTimeout(this.showNextItem, this.delay);
  };

}
