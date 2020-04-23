import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {HeaderService} from '../services/header.service';
import {HeaderModel} from '../header-model';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs/index';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'mf-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.1s', style({ opacity: 0 })),
      ])
    ])
  ]
})
export class MainHeaderComponent implements OnInit, OnDestroy {

  @ViewChild(NavComponent, { static: true }) navComponent;

  private _faUser = faUser;
  private _routerSubscription: Subscription;
  private _usersFormContainerDisplayed: boolean;
  private _usersFormContainerHidden: boolean;
  private _usersFormDisplayed: boolean;

  constructor(private headerService: HeaderService) {
    this._routerSubscription = headerService.routeChanged$.subscribe(param => this.navComponent.currentRoute = param);
  }

  get faUser() {
    return this._faUser;
  }

  get usersFormContainerDisplayed() {
    return this._usersFormContainerDisplayed;
  }

  get usersFormContainerHidden() {
    return this._usersFormContainerHidden;
  }

  get usersFormDisplayed() {
    return this._usersFormDisplayed;
  }

  get drawings() {
    return HeaderModel.constants.drawings;
  }

  toggleUsersForm() {
    if (!this._usersFormDisplayed) {
      setTimeout(() => this._usersFormDisplayed = !this._usersFormDisplayed, 600);
    } else {
      this._usersFormDisplayed = !this._usersFormDisplayed;
    }
    this._usersFormContainerDisplayed = !this._usersFormContainerDisplayed;
    this._usersFormContainerHidden = !this._usersFormContainerDisplayed;
  }

  ngOnInit() {
    this._usersFormContainerDisplayed = false;
    this._usersFormContainerHidden = false;
    this._usersFormDisplayed = false;
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }

  closeEventHandler() {
    this.toggleUsersForm();
  }
}
