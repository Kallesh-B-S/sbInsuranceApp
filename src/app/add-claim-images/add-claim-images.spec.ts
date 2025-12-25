import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaimImages } from './add-claim-images';

describe('AddClaimImages', () => {
  let component: AddClaimImages;
  let fixture: ComponentFixture<AddClaimImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClaimImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClaimImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
