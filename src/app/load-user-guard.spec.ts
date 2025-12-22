import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loadUserGuard } from './load-user-guard';

describe('loadUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loadUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
