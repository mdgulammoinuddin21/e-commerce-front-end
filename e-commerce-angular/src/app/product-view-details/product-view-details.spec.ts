import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewDetails } from './product-view-details';

describe('ProductViewDetails', () => {
  let component: ProductViewDetails;
  let fixture: ComponentFixture<ProductViewDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductViewDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductViewDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
