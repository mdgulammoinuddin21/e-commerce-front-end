import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { MyOrderDetails } from '../_model/order.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  imports: [MatTableModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders implements OnInit {

  displayedColumns = ["Name", "Address", "Contact No.", "Amount", "Status"];
  myOrderDetails: MyOrderDetails[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    this.productService.getMyOrders().subscribe(
      (response:any) => {
        console.log(response);
        this.myOrderDetails=response;
      },
      (error) => {
        console.log(error);
        
      }
    )
  }
}
