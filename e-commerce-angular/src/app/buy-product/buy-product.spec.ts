import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProduct } from './buy-product';

describe('BuyProduct', () => {
  let component: BuyProduct;
  let fixture: ComponentFixture<BuyProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
