import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [MatTableModule,MatButtonModule,MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

    displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price','Action'];

    cartDetails: any[] = [];

    constructor(private productService: ProductService,
      private router:Router
    ) {}

    ngOnInit(): void {
        this.getCartDetails();
    }

    getCartDetails() {
        this.productService.getCartDetails().subscribe(
            (response: any) => {
                console.log(response);
                this.cartDetails = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    checkout() {
      this.router.navigate(['/buyProduct', { 
          isSingleProductCheckout: false, 
          id: 0 
      }]);
      // this.productService.getProductDetails(false, 0).subscribe(
      //    (resp) => {
      //        console.log(resp);
      //    }, 
      //    (err) => {
      //        console.log(err);
      //    }
      //);
    }

    delete(cartId:number) {
        console.log(cartId);
        this.productService.deleteCartItem(cartId).subscribe(
            (response: any) => {
                console.log(response);
                this.getCartDetails();
            },
            (error) => {
                console.log(error);
            }
        )
    }


}
