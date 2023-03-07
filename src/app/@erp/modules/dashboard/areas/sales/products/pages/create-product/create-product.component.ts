import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@erp-core/services/product.service';
import { IProduct } from '@erp-core/interfaces/product.interface';

import { SwalService } from '@erp-core/services/swal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  public product: IProduct = {
    description: '',
    customerPart: '',
    productKey: '',
    price: {
      currency: '',
      price: 0
    },
    taxIncluded: false,
    taxability: '',
    unitKey: '',
    unitName: '',
    sku: '',
    assigned: false,
    client: {
      legalName: '',
      bussinessActivity: {
        activity: 'COMMERCIAL',
        description: ''
      },
      contact: {
        email: '',
        phone: '',
        web: ''
      },
      address: {
        street: '',
        exterior: '',
        interior: '',
        neighborhood: '',
        city: '',
        municipality: '',
        state: '',
        country: '',
        zip: '',
        streets: {
          a: '',
          b: ''
        },
      },
      type: 'CLIENT',
      status: true
    }
  }

  public btnRegister = false;
  public token: any = localStorage.getItem('token');

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _swal: SwalService
  ) {

  }

  register(registerForm: any) {
    if (registerForm.valid) {
      this.btnRegister = true;
      this._productService.registerProduct(this.product, this.token).subscribe(
        response => {
          if (response.product === undefined) {
            this._swal.toast({ text: response.message, icon: 'error' });
            this.btnRegister = false;
          } else {
            this.btnRegister = false;
            this._swal.toast({ text: response.message, icon: 'success' });
            this._router.navigate(['/products/1']);
          }
        }
      )
    } else {
      this._swal.toast({ text: 'Completa el formulario', icon: 'info' });
    }
  }

}
