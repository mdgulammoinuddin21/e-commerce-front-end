import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { ImageProcessing } from './image-processing';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './_services/product-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolver implements Resolve<Product[]> {

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessing
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const id = Number(route.paramMap.get("id"));
    const isSingleProductCheckoutParam = route.paramMap.get("isSingleProductCheckout");
    const isSingleProductCheckout = isSingleProductCheckoutParam === 'true';

    return this.productService.getProductDetails(isSingleProductCheckout, id).pipe(
      map((products: Product[]) =>
        products.map((product: Product) =>
          this.imageProcessingService.createImages(product)
        )
      )
    );
  }  
}
