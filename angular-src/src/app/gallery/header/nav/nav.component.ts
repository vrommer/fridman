import {Component, OnInit} from '@angular/core';
import {HeaderModel} from "../header-model";

@Component({
  selector: 'mf-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private _currentRoute: String;

  constructor() {
  }

  get drawings() {
    return HeaderModel.constants.drawings;
  }

  get calligraphy() {
    return HeaderModel.constants.calligraphy;
  }

  get sculptures() {
    return HeaderModel.constants.sculptures;
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
