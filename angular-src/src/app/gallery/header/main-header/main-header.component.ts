import {Component, OnInit, ViewChild} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {HeaderService} from "../services/header.service";
import {HeaderModel} from "../header-model";
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mf-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @ViewChild(NavComponent) navComponent;

  private _faUser = faUser;
  private _usersFormDisplayed:boolean;
  private _usersFormHidden:boolean;

  constructor(private headerService:HeaderService) {
    headerService.routeChanged$.subscribe(param => this.navComponent.currentRoute = param);
  }

  get faUser() {
    return this._faUser;
  }

  get usersFormDisplayed() {
    return this._usersFormDisplayed;
  }

  get usersFormHidden() {
    return this._usersFormHidden;
  }

  toggleUsersForm() {
    this._usersFormDisplayed = !this._usersFormDisplayed;
    this._usersFormHidden = !this._usersFormDisplayed;
  }

  ngOnInit() {
    this._usersFormDisplayed = false;
    this._usersFormHidden = false;
  }

  get drawings() {
    return HeaderModel.constants.drawings;
  }
}
