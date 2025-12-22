import { TestBed } from '@angular/core/testing';

import { CustomerProfile } from './customer-profile';

describe('CustomerProfile', () => {
  let service: CustomerProfile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerProfile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
