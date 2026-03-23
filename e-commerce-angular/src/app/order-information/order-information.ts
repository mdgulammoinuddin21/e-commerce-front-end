import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { MatTableModule } from '@angular/material/table';
import { MyOrderDetails } from '../_model/order.model';
import { MatAnchor } from "@angular/material/button";
import { NgIf } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-order-information',
  imports: [MatTableModule, MatAnchor,NgIf,MatButtonToggleModule],
  templateUrl: './order-information.html',
  styleUrl: './order-information.css'
})
export class OrderInformation implements OnInit {

  displayedColumns = ["Id", "Product Name","Customer Name", "Address", "Contact No.", "Status", "Action"];
  allOrderDetails: MyOrderDetails[] = [];
  status: string = 'All';
  
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }


  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.status=statusParameter;
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (response) => {
        console.log(response);
        this.allOrderDetails=response;
      },
      (error) => {
        console.log(error);
        
      }
    )
  }

  markAsDelivered(orderId: number) {
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(response);
      },
      (error) => {
        console.log(error);
        
      }
    )
  }
}
