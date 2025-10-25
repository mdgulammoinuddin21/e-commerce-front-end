import { TestBed } from '@angular/core/testing';

import { ProductResolve } from './product-resolve';

describe('ProductResolve', () => {
  let service: ProductResolve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResolve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
