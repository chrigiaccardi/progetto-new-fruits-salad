import { TestBed } from '@angular/core/testing';

import { ApiFruitsService } from './api-fruits-service';

describe('ApiFruitsService', () => {
  let service: ApiFruitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFruitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
