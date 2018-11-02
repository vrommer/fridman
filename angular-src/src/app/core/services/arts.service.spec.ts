import { TestBed, inject } from '@angular/core/testing';

import { ArtsService } from './arts.service';

describe('ArtsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtsService]
    });
  });

  it('should be created', inject([ArtsService], (service: ArtsService) => {
    expect(service).toBeTruthy();
  }));
});
