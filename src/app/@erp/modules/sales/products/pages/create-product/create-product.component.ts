import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@erp-core/services/product.service';
import { IProduct } from '@erp-core/interfaces/product.interface';
declare var $: any;

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
    client: ''
  }

  public btnRegister = false;
  public token: any = localStorage.getItem('token');

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) {

  }

  register(registerForm: any) {
    if (registerForm.valid) {
      this.btnRegister = true;
      this._productService.registerProduct(this.product, this.token).subscribe(
        response => {
          if (response.product === undefined) {
            $.notify(response.message, {
              type: 'danger',
              spacing: 10,
              timer: 2000,
              placement: {
                from: 'top',
                align: 'right'
              },
              delay: 1000,
              animate: {
                enter: 'animated ' + 'bounce',
                exit: 'animated ' + 'bounce'
              }
            });
            this.btnRegister = false;
          } else {
            this.btnRegister = false;
            $.notify(response.message, {
              type: 'success',
              spacing: 10,
              timer: 2000,
              placement: {
                from: 'top',
                align: 'right'
              },
              delay: 1000,
              animate: {
                enter: 'animated ' + 'bounce',
                exit: 'animated ' + 'bounce'
              }
            });
            this._router.navigate(['/products/1']);
          }
        }
      )
    } else {
      $.notify('Complete el formulario.', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    }
  }

}
