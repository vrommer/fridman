import { TestBed, inject } from '@angular/core/testing';

import { AppControlService } from './app-control.service';

describe('AppControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppControlService]
    });
  });

  it('should be created', inject([AppControlService], (service: AppControlService) => {
    expect(service).toBeTruthy();
  }));
});
