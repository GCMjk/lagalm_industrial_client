import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@erp-core/services/product.service';
import { IProduct } from '@erp-core/interfaces/product.interface';
declare var $: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public id = '';
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

  public btnEdit = false;
  public token: any = localStorage.getItem('token');
  public loadData = false;
  public data = false;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.loadData = true;
        this._productService.getProduct(this.id, this.token).subscribe(
          response => {
            if (response.product != undefined) {
              this.product = response.product;
              this.data = true;
              this.loadData = false;
            } else {
              this.data = false;
              this.loadData = false;
            }
          }
        )
      }
    )
  }

  edit(editForm: any) {
    if (editForm.valid) {
      this.btnEdit = true;
      this._productService.editProduct(this.id, this.product, this.token).subscribe(
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
            this.btnEdit = false;
          } else {
            this.btnEdit = false;
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
            this._router.navigate(['../', '1']);
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
