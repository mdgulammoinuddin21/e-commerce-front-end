import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from './_services/product-service';
import { ImageProcessing } from './image-processing';
import { Product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolve implements Resolve<Product> {

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessing
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = Number(route.paramMap.get("productId"));

    if (id) {
      // Fetch product details from backend and process images
      return this.productService.getProductDetailsById(id)
        .pipe(
          map(p => this.imageProcessingService.createImages(p))
        );
    } else {
      // Return an empty product observable if no ID in route
      return of(this.getProductDetails());
    }
  }

  getProductDetails(): Product {
    return {
      productId:0,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    };
  }
}
