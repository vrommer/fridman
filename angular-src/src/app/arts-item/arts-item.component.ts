import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {timer} from "rxjs/index";
import {take} from "rxjs/internal/operators";

@Component({
  selector: 'mf-arts-item',
  templateUrl: './arts-item.component.html',
  styleUrls: ['./arts-item.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity:1 })),
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity:0 }))
      ]),
    ])
  ]
})
export class ArtsItemComponent implements OnInit {

  _hidden: boolean;

  get isHidden(): boolean {
    return this._hidden;
  }

  public hide() {
    this._hidden = true;
  }

  public show() {
    this._hidden = false;
  }

  public showNew() {
    this._hidden = false;
  }

  toggle() {
    this._hidden = !this._hidden;
  }

  constructor() {
  }

  ngOnInit() {
    // this.hide();
    // timer(400).pipe(take(1)).subscribe(() => this.show());
  }
}
