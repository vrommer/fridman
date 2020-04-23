import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'mf-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private selectedElement: string;
  constructor() { }

  ngOnInit() {
    this.selectedElement = 'logIn';
  }

  isSelected(val) {
    return this.selectedElement === val;
  }

  select(val) {
    this.selectedElement = val;
  }

}
