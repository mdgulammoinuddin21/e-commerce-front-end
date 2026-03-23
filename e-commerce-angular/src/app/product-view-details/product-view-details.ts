import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../_services/product-service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-view-details',
  imports: [MatButtonModule,MatGridListModule,CommonModule,MatIconModule],
  templateUrl: './product-view-details.html',
  styleUrl: './product-view-details.css'
})
export class ProductViewDetails implements OnInit {

  product!: Product;
  selectedProductIndex=0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
    
  }
  changeIndex(index: number) {
    this.selectedProductIndex=index;
  }

  buyProduct(productId: number) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true,id: productId
    }]);
  }

  addToCart(productId: number) {
    console.log(productId);
    this.productService.addToCart(productId).subscribe(
      (resp) => {
        console.log(resp);        
      },
      (error) => {
        console.log(error);        
      }
    )
  }
}
