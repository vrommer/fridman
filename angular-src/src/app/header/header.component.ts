import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'mf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  private _drawings: String= 'drawings';
  private _calligraphy: String = 'calligraphy';
  private _sculptures: String = 'sculptures';
  private _currentRoute: String;

  @Output() changeCategory: EventEmitter<String> = new EventEmitter();

  constructor(private router: Router) {
    this.currentRoute = this.router.url.split('/')[1];
  }

  get drawings() {
    return this._drawings;
  }

  get calligraphy() {
    return this._calligraphy;
  }

  get sculptures() {
    return this._sculptures;
  }

  get currentRoute () {
    return this._currentRoute;
  }

  set currentRoute(val) {
    this._currentRoute = val;
  }

  ngOnInit() {
  }

  changeRoute (param, event) {
    event.preventDefault();
    this.changeCategory.emit(param);
    this.currentRoute = param;
  }
}
