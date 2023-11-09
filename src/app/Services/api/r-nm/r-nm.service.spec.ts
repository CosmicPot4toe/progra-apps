import { TestBed } from '@angular/core/testing';

import { RNmService } from './r-nm.service';

describe('RNmService', () => {
  let service: RNmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RNmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
