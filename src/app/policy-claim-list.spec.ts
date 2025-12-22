import { TestBed } from '@angular/core/testing';

import { PolicyClaimList } from './policy-claim-list';

describe('PolicyClaimList', () => {
  let service: PolicyClaimList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyClaimList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
