import { TestBed } from '@angular/core/testing';

import { PolicyList } from './policy-list';

describe('PolicyList', () => {
  let service: PolicyList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
