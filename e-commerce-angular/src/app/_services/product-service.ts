import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { UserAuth } from '../_services/user-auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private userAuth: UserAuth) { }

  public addProduct(product: FormData) {
    const token = this.userAuth.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.post<Product>(
      "http://localhost:9090/addNewProduct",
      product,
      { headers }
    );
  }

  public getAllProducts() {
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts");
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/" + productId);
  }
}
