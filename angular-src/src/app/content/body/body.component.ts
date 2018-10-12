import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mf-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  param: Object;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( p => this.param = p );
  }

  ngOnInit() {
  }

}
