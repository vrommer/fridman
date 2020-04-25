import {
  Component, HostListener, Input, OnInit, OnDestroy
} from '@angular/core';
import {CarouselMode} from '../../shared/carousel/carousel-utils/carousel-mode';
import {AppControlService} from '../../core/services/app-control.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'mf-close-up',
  templateUrl: './close-up.component.html',
  styleUrls: ['./close-up.component.scss']
})
export class CloseUpComponent implements OnInit, OnDestroy {
  @Input() requestedItemId: any;
  private _carouselMode: CarouselMode = CarouselMode.manual;
  private _sources: any;
  private _itemIndex: number;
  private _dataProviderSubscription: Subscription;
  @HostListener('document:keydown.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    event.preventDefault();
    this.exitCloseUp();
  }


  constructor(private control: AppControlService
  ) { }

  ngOnInit() {
    let firstRun = true;
    this._dataProviderSubscription = this.control.dataProvider$.subscribe(oData => {
      this._sources = oData;
      if (firstRun) {
        this._itemIndex = this.findItemIndex(this.requestedItemId);
        firstRun = false;
      }
    });
    this.getData();
  }

  ngOnDestroy(): void {
    this._dataProviderSubscription.unsubscribe();
  }

  get carouselMode() {
    return this._carouselMode;
  }

  get sources() {
    return this._sources;
  }

  get requestedItemIndex() {
    return this._itemIndex;
  }

  getMoreData() {
    this.control.requestMoreData();
  }

  getData() {
    this.control.requestData();
  }

  updateCurrentItemIndex(newIndex) {
    this._itemIndex = newIndex;
  }

  findItemIndex(id) {
    for (let sourceIndex = 0; sourceIndex < this._sources.length; sourceIndex++) {
      if (this._sources[sourceIndex].id === id) {
        return sourceIndex;
      }
    }
    return 0;
  }

  exitCloseUp() {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: auto');
    this.control.requestDetails(null);
  }

}
