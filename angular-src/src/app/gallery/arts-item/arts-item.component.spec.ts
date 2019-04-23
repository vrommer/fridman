import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsItemComponent } from './arts-item.component';

describe('ArtsItemComponent', () => {
  let component: ArtsItemComponent;
  let fixture: ComponentFixture<ArtsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
