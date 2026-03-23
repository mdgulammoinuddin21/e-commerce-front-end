import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { UserAuth } from '../_services/user-auth';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private userAuth: UserAuth) { }

  public addProduct(product: FormData) {
    
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

  public getAllProducts(pageNumber:number, searchKey:string = "") {
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchKey);
  }

  public getProductDetailsById(productId: number) {
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/" + productId);
  }


  public deleteProduct(productId: number) {
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/" + productId);
  }

  public getProductDetails(isSingleProductCheckout: boolean, productId: number) {
    return this.httpClient.get<Product[]>(
        "http://localhost:9090/getProductDetails/" + isSingleProductCheckout + "/" + productId
    );
  }

  public placeOrder(orderDetails: OrderDetails,isCartCheckout: string | null) {
    return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout, orderDetails);
  }

  public addToCart(productId: number) {
    return this.httpClient.get("http://localhost:9090/addToCart/" + productId);
  }

  public getCartDetails() {
    return this.httpClient.get("http://localhost:9090/getCartDetails");
  }

  public deleteCartItem(cartId:number) {
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/" + status);
  }

  public markAsDelivered(orderId: number) {
    return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/" + orderId);
  }

  public createTransaction(amount: number) {
    return this.httpClient.get("http://localhost:9090/createTransaction/" + amount);
  }
}
