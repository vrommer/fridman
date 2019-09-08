import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseUpComponent } from './close-up.component';
import {ArtsItemModule} from "../arts-item/arts-item.module";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {mockData} from "../../../../test_resources/mockData";
import {AppControlService} from "../../core/services/app-control.service";
import {ArtsService} from "../../core/services/arts.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Observable} from "rxjs/index";
import {DataService} from "../arts-grid/Services/data.service";
import Spy = jasmine.Spy;
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Component, ViewChild} from "@angular/core";

@Component({
  selector: 'mf-calligraphy',
  template: `
    <mf-close-up [requestedItemId]="'1'"></mf-close-up>
  `,
  styles: []
})
class MockComponent {
  @ViewChild(CloseUpComponent) public child: CloseUpComponent;
}

describe('CloseUpComponent', () => {
  let component: CloseUpComponent;
  let control: AppControlService;
  let service: ArtsService;
  let closeUpElement: HTMLElement;
  let fixture: ComponentFixture<MockComponent>;
  let spyFn:Spy;
  const mockDataMap = mockData.mockImages;

  beforeEach(async(() => {

  }));

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        ArtsItemModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        MockComponent,
        CloseUpComponent
      ],
      providers: [
        AppControlService,
        ArtsService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance.child;
    control = TestBed.get(AppControlService);
    service = TestBed.get(ArtsService);
    closeUpElement = fixture.nativeElement;
    closeUpElement.style.opacity = '0';
    fixture.detectChanges();
    control.provideData(mockDataMap.get('drawings'));
    spyFn = spyOn(component, 'getMoreData').and.callFake(() => {
      control.provideData([...mockDataMap.get('drawings'), ...mockDataMap.get('moreDrawings')]);
    });

    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.sources).toBeTruthy();
  });

  it('should show item.', () => {
    let elements = document.getElementsByClassName('mf-carousel');
    expect(elements.length).toEqual(1, 'Only 1 carousel should be present,');
  });

  it('should find item index', async() => {
    let nextBtn = document.getElementsByClassName('app-carousel-forward-button')[0];
    expect(component.requestedItemIndex).toBe(0, 'image with id 0 should be displayed.');
    nextBtn.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.requestedItemIndex).toBe(1, 'image with id 1 should be displayed.');
  });

  it('should get more data when data is low', async() => {
    expect(component.sources.length).toBe(2, '2 images should be displayed.');
    let nextBtn = document.getElementsByClassName('app-carousel-forward-button')[0];
    nextBtn.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(spyFn).toHaveBeenCalled();
    expect(component.sources.length).toBe(4, '4 images should be displayed.');
  });
});

