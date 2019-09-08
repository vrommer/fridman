import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsGridComponent } from './arts-grid.component';
import { ArtsItemComponent } from '../arts-item/arts-item.component'
import { Observable} from "rxjs/index";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import Spy = jasmine.Spy;
import {DataService} from "./Services/data.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {mockData} from "../../../../test_resources/mockData";
import {AppControlService} from "../../core/services/app-control.service";

describe('ArtsGridComponent', () => {

  let component: ArtsGridComponent;
  let fixture: ComponentFixture<ArtsGridComponent>;
  let artsGridElement: HTMLElement;
  let spyFn: Spy;
  let images: any;

  const mockDataMap = mockData.mockImages;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        ArtsGridComponent,
        ArtsItemComponent
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    artsGridElement = fixture.nativeElement;
    images = artsGridElement.getElementsByClassName('mfArtWorkThumbnailContainer');
    spyFn = spyOn(DataService.prototype, 'getArtifacts').and.callFake((imageType, lastPage) => {
      return Observable.create(observer => {
        if (!lastPage) {
          observer.next(mockDataMap.get(imageType));
        }
        else {
          observer.next(mockDataMap.get('moreDrawings'));
        }
        observer.complete();
      });
    });
  });

  afterEach(() => {
    component = null;
    fixture = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display drawings', async() => {
    expect(images.length).toBe(0, 'No images should be present yet.');
    expect(component.sources).not.toBeTruthy();
    component.category = 'drawings';
    component.fnGetData();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.sources).toBeTruthy();
    expect(images.length).toBe(2, '2 images should be displayed.');
  });

  it('should display sculptures', async() => {
    expect(images.length).toBe(0, 'No images should be present yet.');
    expect(component.sources).not.toBeTruthy();
    component.category = 'sculptures';
    component.fnGetData();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.sources).toBeTruthy();
    expect(images.length).toBe(2, '2 images should be displayed.');
  });

  it('should display calligraphy', async() => {
    expect(images.length).toBe(0, 'No images should be present yet.');
    expect(component.sources).not.toBeTruthy();
    component.category = 'calligraphy';
    component.fnGetData();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.sources).toBeTruthy();
    expect(images.length).toBe(2, '2 images should be displayed.');
  });

  it('should not display unknown categories', async() => {
    expect(images.length).toBe(0, 'No images should be present yet.');
    expect(component.sources).not.toBeTruthy();
    component.category = 'dummy';
    component.fnGetData();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.sources).not.toBeTruthy();
    expect(images.length).toBe(0, 'No images should be present.');
  });

  it('should display more data on scroll', async() => {
    expect(images.length).toBe(0, 'No images should be present yet.');
    component.category = 'drawings';
    component.fnGetData();
    await fixture.whenStable();
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.sources).toBeTruthy();
    expect(images.length).toBe(4, '4 images should be displayed.');
  });

  it('should send details request to control', async() => {
    const showDetailsSpy = spyOn(AppControlService.prototype, 'requestDetails');
    component.category = 'drawings';
    component.fnGetData();
    await fixture.whenStable();
    fixture.detectChanges();
    (images[0] as HTMLElement).click();
    expect(showDetailsSpy).toHaveBeenCalledWith({
      sources: component.sources,
      itemId: null
    })
  });
});
