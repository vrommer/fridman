import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent } from './gallery.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CloseUpComponent} from "./close-up/close-up.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import {HeaderModule} from "./header/header.module";
import {ArtsItemComponent} from "./arts-item/arts-item.component";
import {DrawingsComponent} from "./arts-grid/drawings.component";
import {SculpturesComponent} from "./arts-grid/sculptures.component";
import {CalligraphyComponent} from "./arts-grid/calligraphy.component";
import {ArtsGridComponent} from "./arts-grid/arts-grid.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

fdescribe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        SharedModule,
        HeaderModule,
        NoopAnimationsModule
      ],
      declarations: [
        GalleryComponent,
        ArtsItemComponent,
        DrawingsComponent,
        SculpturesComponent,
        CalligraphyComponent,
        ArtsGridComponent,
        CloseUpComponent
      ],
      providers: [
        ArtsItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
