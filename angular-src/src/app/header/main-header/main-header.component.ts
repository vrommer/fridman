import {Component, OnInit, ViewChild} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {HeaderService} from "../services/header.service";
import {HeaderModel} from "../header-model";

@Component({
  selector: 'mf-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @ViewChild(NavComponent) navComponent;

  constructor(private headerService:HeaderService) {
    headerService.routeChanged$.subscribe(param => this.navComponent.currentRoute = param);
  }

  ngOnInit() {
  }

  get drawings() {
    return [HeaderModel.constants.gallery, HeaderModel.constants.drawings].join('/');
  }
}
