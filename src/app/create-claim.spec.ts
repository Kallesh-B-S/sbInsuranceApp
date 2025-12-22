import { TestBed } from '@angular/core/testing';

import { CreateClaim } from './create-claim';

describe('CreateClaim', () => {
  let service: CreateClaim;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateClaim);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
