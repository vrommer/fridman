import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseUpComponent } from './close-up.component';

describe('CloseUpComponent', () => {
  let component: CloseUpComponent;
  let fixture: ComponentFixture<CloseUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
