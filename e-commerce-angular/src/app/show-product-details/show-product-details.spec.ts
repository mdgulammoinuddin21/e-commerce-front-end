import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductDetails } from './show-product-details';

describe('ShowProductDetails', () => {
  let component: ShowProductDetails;
  let fixture: ComponentFixture<ShowProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProductDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
