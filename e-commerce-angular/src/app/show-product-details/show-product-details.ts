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

@Component({
  selector: 'app-show-product-details',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './show-product-details.html',
  styleUrl: './show-product-details.css'
})
export class ShowProductDetails implements OnInit {
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
      height: '500px',
      width: '800px'
    });
  }


  editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', {productId : productId}]);
  }
}
