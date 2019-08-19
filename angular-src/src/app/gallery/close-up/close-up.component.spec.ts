import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseUpComponent } from './close-up.component';
import {ArtsItemModule} from "../arts-item/arts-item.module";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {mockData} from "../../../../../services/mockData";

fdescribe('CloseUpComponent', () => {
  let component: CloseUpComponent;
  let closeUpElement: HTMLElement;
  let fixture: ComponentFixture<CloseUpComponent>;
  const mockDataMap = mockData.mockImages;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        ArtsItemModule
      ],
      declarations: [ CloseUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseUpComponent);
    component = fixture.componentInstance;
    closeUpElement = fixture.nativeElement;
    closeUpElement.style.opacity = '0';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should view correct item', () => {

  });

  it('should view next item', () => {

  });

  it('should view previous item', () => {

  });

  it('should load more items when reaching the end of items list', () => {

  });

  it('should not disable next button at last item', () => {

  });

  it('should disable previous button on first item', () => {

  });
});
