import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppControlService} from "../../core/services/app-control.service";
import {HeaderService} from "../services/header.service";
import {HeaderModel} from "../header-model";

@Component({
  selector: 'mf-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {
  private _currentRoute: String;

  constructor(private router: Router,
              private control:AppControlService,
              private headerService:HeaderService,
  ) {
    this.currentRoute = this.router.url.split('/')[1];
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

  changeRoute (param, event) {
    event.preventDefault();
    this.headerService.changeRoute(param);
    this.control.changeArtsCategory(param);
    this.currentRoute = param;
  }

  ngOnInit() {
  }

}
