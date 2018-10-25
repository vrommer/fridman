import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsGridComponent } from './arts-grid.component';

describe('ArtsGridComponent', () => {
  let component: ArtsGridComponent;
  let fixture: ComponentFixture<ArtsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
