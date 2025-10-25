import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../_model/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Drag } from "../drag";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatGridListModule, CommonModule, Drag],
  templateUrl: './add-new-product.html',
  styleUrls: ['./add-new-product.css']
})
export class AddNewProduct implements OnInit {
  isNewProduct = true;

  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  };

  constructor(
    private productService:ProductService,
    private sanitizer:DomSanitizer,
    private activatedRoute: ActivatedRoute
  )
  {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];

    if(this.product && this.product.productId) {
      this.isNewProduct = false;
    }
  }

  addProduct(productForm : NgForm) {
    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response:Product) => {
        console.log(response);      //returned by backend API  
        productForm.reset();  //clearing the form
        this.product.productImages = []  //clearing the images from screen after adding
      },
      (error:HttpErrorResponse) => {
        console.log(error);
        
      }
    );
    console.log("added");
    
  }
  clearForm(productForm: any) {
    productForm.resetForm();
    this.product.productImages = []
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }


  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }


  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      for (let file of files) {
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustResourceUrl(
            window.URL.createObjectURL(file)
          )
        };
        this.product.productImages.push(fileHandle);
      }
      console.log('Selected files:', this.product.productImages);
    }
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }



}
