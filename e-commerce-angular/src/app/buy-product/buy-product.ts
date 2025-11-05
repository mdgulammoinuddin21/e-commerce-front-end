import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderDetails } from '../_model/order-details.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-product',
  imports: [MatFormFieldModule,FormsModule,MatButtonModule,MatInputModule,CommonModule],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.css'
})
export class BuyProduct {
  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService:ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push({
        productId: x.productId,
        quantity: 1
      })
    );

    console.log(this.productDetails);
    console.log(this.orderDetails);
    
    
  }
  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(['/orderConfirm']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getQuantityForProduct(productId: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number,productDiscountedPrice:number) {
    return this.getQuantityForProduct(productId) * productDiscountedPrice;
  }

  onQuantityChanged(q: any, productId: number) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach((productQuantity) => {
      const price = this.productDetails.filter(
        (product) => product.productId === productQuantity.productId
      )[0].productDiscountedPrice;

      grandTotal = grandTotal + price * productQuantity.quantity;
    });

    return grandTotal;
  }


}
