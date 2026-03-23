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
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// import Razorpay from 'razorpay';
declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  imports: [MatFormFieldModule,FormsModule,MatButtonModule,MatInputModule,CommonModule,MatIconModule,MatOptionModule,MatSelectModule],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.css'
})
export class BuyProduct {
  productDetails: Product[] = [];
  isSingleProductCheckout: string | null = '';

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: []
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService:ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

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
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
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


  getProductQuantityIndex(productId: number): number {
    return this.orderDetails.orderProductQuantityList.findIndex(
      (productQuantity) => productQuantity.productId === productId
    );
  }

  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response)=>{
        console.log(response);
        this.openTransactionModal(response,orderForm);
      },
      (error)=>{
        console.log(error);
        
      }
    );
  }

  openTransactionModal(response: any,orderForm: NgForm) {
      var options = {
          order_id: response.orderId,
          key: response.key,
          amount: response.amount,
          currency: response.currency,
          name: 'Learn programming yourself',
          description: 'Payment of online shopping',
          image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
          handler: (response: any) => {
              if(response != null && response.razorpay_payment_id != null) {
                  this.processResponse(response, orderForm);
              } else {
                  alert("Payment failed.");
              }
          },
          prefill: {
              name: 'LPY',
              email: 'LPY@GMAIL.COM',
              contact: '90909090'
          },
          notes: {
              address: 'Online Shopping'
          },
          theme: {
              color: '#3399cc'
          },
          method: {
              upi: '1',  // Explicitly enable UPI
              card: '1',
              netbanking: '1',
              wallet: '1'
          }
      };
      
      var razorpay = new Razorpay(options);
      razorpay.open();
  }

  processResponse(response: any,orderForm: NgForm) {
    this.orderDetails.transactionId = response.razorpay_payment_id;
    this.placeOrder(orderForm);
    console.log('Payment Response:', response);
    // Handle the payment response here
  }

}
