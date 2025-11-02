import { TestBed } from '@angular/core/testing';

import { BuyProductResolver } from './buy-product-resolver';

describe('BuyProductResolver', () => {
  let service: BuyProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyProductResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
