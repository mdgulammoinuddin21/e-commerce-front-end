import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImagesDialog } from './show-product-images-dialog';

describe('ShowProductImagesDialog', () => {
  let component: ShowProductImagesDialog;
  let fixture: ComponentFixture<ShowProductImagesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProductImagesDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductImagesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
