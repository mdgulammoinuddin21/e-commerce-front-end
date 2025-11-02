import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderDetails } from '../_model/order-details.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product-service';

@Component({
  selector: 'app-buy-product',
  imports: [MatFormFieldModule,FormsModule,MatButtonModule,MatInputModule],
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
    private productService:ProductService
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
