import { Component, OnInit } from '@angular/core';

import { SwalService } from '@erp-core/services/swal.service';
import { ViewService } from '@erp-core/services/common/view.service';
import { ProductService } from '@erp/core/services/sales/product.service';

import { IProduct } from '@erp-core/interfaces/sales/product.interface';
import { IClient } from '@erp-core/interfaces/sales/client.interface';
import { IResult } from '@erp-core/interfaces/common/result.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  public products: Array<IProduct> = [];
  
  constructor(
    private _swal: SwalService,
    private _viewService: ViewService,
    private _productService: ProductService
  ) {  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      ({ data }: IResult) => {
        this.products = data;
      }
    )
  }

  setStatus(id: IProduct['_id'], status: IProduct['status']) {
    this._productService.editStatusProduct(id, status).subscribe(
      ({ message }: IResult) => {
        this._swal.toast({ text: message, icon: 'success' })
        this.getProducts();
        this.getProduct(id);
      }
    )
  }

  setAssign(id: IProduct['_id'], assigned: IProduct['assigned']) {
    this._productService.editAssignedProduct(id, assigned).subscribe(
      ({ message }: IResult) => {
        this._swal.toast({ text: message, icon: 'success' });
        this.getProducts();
        this.getProduct(id);
      }
    )
  }

  getProduct(id: IClient['_id']) {
    this._productService.getProduct(id).subscribe(
      ({ data }: IResult) => {
        this._viewService.viewObservableData({
          type: 'Producto',
          _id: data._id,
          id: data.sku,
          img: data.img,
          name: data.description,
          description: `ID del cliente ${data.customerPart}`,
          status: data.status,
          edit: {
            route: ['sales', 'product', 'edit', data._id],
            actions: [
              {
                action: data.assigned ? 'Desasignar' : 'Asignar',
                handleAction: () => this.setAssign(data._id, data.assigned)
              },
              {
                action: data.status ? 'Desactivar' : 'Activar',
                handleAction: () => this.setStatus(data._id, data.status),
                textColor: data.status ? 'text-red-500' : 'text-green-500',
                icon: data.status ? 'fa-solid fa-ban' : 'fa-solid fa-check'
              }
            ]
          },
          sections: [
            {
              nameSection: 'Datos del producto',
              elements: [
                {
                  key: 'Clave del producto',
                  value: data.productKey
                },
                {
                  key: 'Precio',
                  value: `$${data.price} ${data.client.tax?.currency}`
                },
                {
                  key: 'Unidad',
                  value: `${data.unitKey} - ${data.unitName}`
                }
              ]
            }
          ]
        });
        this._viewService.toggleSlideOver()
      }
    )
  }

}
