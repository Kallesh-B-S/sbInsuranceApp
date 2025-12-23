import { TestBed } from '@angular/core/testing';

import { ClaimData } from './claim-data';

describe('ClaimData', () => {
  let service: ClaimData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
