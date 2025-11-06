import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from '../_services/product-service';
import { ImageProcessing } from '../image-processing';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule,CommonModule,MatButtonModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  pageNumber: number = 0;
  showMoreProducts:boolean=true;
  productDetails : Product[] = [];

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessing,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.getAllProducts();
  }

  searchByKeyword(searchKey: string) {
    console.log(searchKey);
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKey);
  }

  public getAllProducts(searchKey: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe({
        next: (resp: Product[]) => {
          if(resp.length > 0) {
            resp.forEach(p => this.productDetails.push(p));
            this.showMoreProducts = true;
          }else {
            this.showMoreProducts = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }
  showProductDetails(productId:number) {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }
  loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

}
