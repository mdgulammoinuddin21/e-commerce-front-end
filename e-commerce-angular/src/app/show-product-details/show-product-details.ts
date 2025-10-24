import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-show-product-details',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './show-product-details.html',
  styleUrl: './show-product-details.css'
})
export class ShowProductDetails implements OnInit {
  displayedColumns: string[] = ['ID', 'Product Name', 'Product Description', 'Product Actual Price', 'Product Discounted Price', 'Edit', 'Delete'];
  productDetails : Product[] = [];
  constructor(private productService:ProductService) {}

  ngOnInit(): void {
    this.getAllProducts(); 
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response : Product[]) => {
        console.log(response);
        this.productDetails=response;
      },
      (error : HttpErrorResponse) => {
        console.log(error);        
      }
    );
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
}
