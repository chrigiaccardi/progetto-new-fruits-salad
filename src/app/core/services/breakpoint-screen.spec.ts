import { TestBed } from '@angular/core/testing';

import { BreakpointScreen } from './breakpoint-screen';

describe('BreakpointScreen', () => {
  let service: BreakpointScreen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointScreen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
