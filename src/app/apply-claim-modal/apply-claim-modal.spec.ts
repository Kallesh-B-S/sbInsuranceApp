import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyClaimModal } from './apply-claim-modal';

describe('ApplyClaimModal', () => {
  let component: ApplyClaimModal;
  let fixture: ComponentFixture<ApplyClaimModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyClaimModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyClaimModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
