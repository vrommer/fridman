import {Component, OnInit} from '@angular/core';
import {HeaderModel} from "../header-model";

@Component({
  selector: 'mf-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {
  private _currentRoute: String;

  constructor() {
  }

  get drawings() {
    return [HeaderModel.constants.gallery, HeaderModel.constants.drawings].join('/');
  }

  get calligraphy() {
    return [HeaderModel.constants.gallery, HeaderModel.constants.calligraphy].join('/');
  }

  get sculptures() {
    return [HeaderModel.constants.gallery, HeaderModel.constants.sculptures].join('/');
  }

  get currentRoute () {
    return this._currentRoute;
  }

  set currentRoute(val) {
    this._currentRoute = val;
  }

  ngOnInit() {
  }

}
