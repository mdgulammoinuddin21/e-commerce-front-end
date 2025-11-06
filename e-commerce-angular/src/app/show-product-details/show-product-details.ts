import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShowProductImagesDialog } from '../show-product-images-dialog/show-product-images-dialog';
import { ImageProcessing } from '../image-processing';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-product-details',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatDialogModule,CommonModule],
  templateUrl: './show-product-details.html',
  styleUrl: './show-product-details.css'
})
export class ShowProductDetails implements OnInit {
  pageNumber:number  = 0;
  showTable=false;
  showLoadMoreProduct = false;
  displayedColumns: string[] = ['ID', 'Product Name', 'Product Description', 'Product Actual Price', 'Product Discounted Price', 'Images', 'Edit', 'Delete'];
  productDetails : Product[] = [];
  constructor(
    private productService:ProductService,
    public imageDialog: MatDialog,
    private imageProcessingService:ImageProcessing,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts(); 
  }

  public getAllProducts() {
    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe({
        next: (resp: Product[]) => {
          resp.forEach(product => this.productDetails.push(product));
          console.log(this.productDetails);
          this.showTable=true;

          if(resp.length > 0) {
            this.showLoadMoreProduct=true;
          }else {
            this.showLoadMoreProduct=false;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        this.getAllProducts();      
      },
      (error:HttpErrorResponse) => {
        console.log(error);        
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imageDialog.open(ShowProductImagesDialog, {
      data: {
        images: product.productImages
      },
      width: '70vw',   // 80% of viewport width
      height: '80vh',  // 80% of viewport height
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }


  editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', {productId : productId}]);
  }

  loadMoreProducts() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
}
