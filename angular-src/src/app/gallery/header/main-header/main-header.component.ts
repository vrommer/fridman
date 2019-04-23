import {Component, OnInit, ViewChild} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {HeaderService} from "../services/header.service";
import {HeaderModel} from "../header-model";
import {faCoffee, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mf-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @ViewChild(NavComponent) navComponent;

  faUser = faUser;
  faCoffee = faCoffee;

  constructor(private headerService:HeaderService) {
    headerService.routeChanged$.subscribe(param => this.navComponent.currentRoute = param);
  }

  ngOnInit() {
  }

  get drawings() {
    return HeaderModel.constants.drawings;
  }
}
