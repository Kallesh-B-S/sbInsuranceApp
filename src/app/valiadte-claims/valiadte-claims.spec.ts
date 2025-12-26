import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiadteClaims } from './valiadte-claims';

describe('ValiadteClaims', () => {
  let component: ValiadteClaims;
  let fixture: ComponentFixture<ValiadteClaims>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValiadteClaims]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiadteClaims);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
