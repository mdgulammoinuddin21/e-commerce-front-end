import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from '../_services/product-service';
import { ImageProcessing } from '../image-processing';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule,CommonModule,MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
    productDetails : Product[] = [];

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessing
  ) {}

  ngOnInit(): void {
      this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe({
        next: (resp: Product[]) => {
          console.log(resp);
          this.productDetails = resp;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }
}
