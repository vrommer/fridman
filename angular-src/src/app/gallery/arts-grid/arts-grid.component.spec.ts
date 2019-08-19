import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsGridComponent } from './arts-grid.component';
import { ArtsItemComponent } from '../arts-item/arts-item.component'
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject} from "rxjs/index";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import Spy = jasmine.Spy;
import {DataService} from "./Services/data.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AppControlService} from "../../core/services/app-control.service";
import {mockData} from "../../../../../services/mockData";

describe('ArtsGridComponent', () => {
  let component: ArtsGridComponent;
  let fixture: ComponentFixture<ArtsGridComponent>;
  let router: ActivatedRoute;
  let artsGridElement: HTMLElement;
  let spyFn: Spy;

  const routerParamSubject = new Subject<any>();
  const drawingsParam = {'param': 'drawings'};
  const calligraphyParam = {'param': 'calligraphy'};
  const fakeActivatedRoute = {
    params: routerParamSubject.asObservable()
  };

  const mockDataMap = new Map(mockData.mockImages);

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
      providers: [
        {
          provide: ActivatedRoute, useFactory: () => fakeActivatedRoute
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtsGridComponent);
    component = fixture.componentInstance;
    router = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
    artsGridElement= fixture.nativeElement;
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
    router = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data when url is changed', async(async() => {
    let images = artsGridElement.getElementsByClassName('mfArtWorkThumbnailContainer');
    expect(images.length).toBe(0, 'No images should be present yet.');
    routerParamSubject.next(calligraphyParam);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(images.length).toBe(2, '2 images should be displayed.');
    routerParamSubject.next(drawingsParam);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(images.length).toBe(2, '2 images should be displayed.');
    expect(spyFn.calls.count()).toEqual(2);
    expect(spyFn.calls.argsFor(0)).toEqual(['calligraphy', undefined]);
    expect(spyFn.calls.argsFor(1)).toEqual(['drawings', undefined]);
  }));

  it('should get additional data when page is scrolled', async(async() => {
    let images = artsGridElement.getElementsByClassName('mfArtWorkThumbnailContainer');
    routerParamSubject.next(drawingsParam);
    await fixture.whenStable();
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(images.length).toBe(4, '4 images should be displayed.');
  }));

  it('should request image details when image is clicked', async(async() =>  {
    let images = artsGridElement.getElementsByClassName('mfArtWorkThumbnailContainer');
    const showDetailsSpy = spyOn(AppControlService.prototype, 'requestDetails');
    routerParamSubject.next(drawingsParam);
    await fixture.whenStable();
    fixture.detectChanges();
    (images[0] as HTMLElement).click();
    expect(showDetailsSpy).toHaveBeenCalledWith({
      sources: component.sources,
      itemId: null
    })
  }));
});
