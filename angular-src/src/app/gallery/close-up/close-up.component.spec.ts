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
  const mockDataMap = new Map(mockData.mockImages);

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
    closeUpElement.style.opacity = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
