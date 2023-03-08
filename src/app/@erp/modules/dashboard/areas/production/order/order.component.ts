import { Component, OnInit } from '@angular/core';

import { SwalService } from '@erp-core/services/swal.service';
import { ViewService } from '@erp-core/services/common/view.service';
import { OrderService } from '@erp/core/services/production/order.service';

import { IOrder } from '@erp-core/interfaces/production/order.interface';
import { IResult } from '@erp-core/interfaces/common/result.interface';
import { IView } from '../../../../../core/interfaces/common/view/view.interface';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  public orders: Array<IOrder> = [];

  constructor(
    private _swal: SwalService,
    private _viewService: ViewService,
    private _orderService: OrderService
  ) {  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._orderService.getOrders().subscribe(
      ({ data }: IResult) => {
        this.orders = data;
      }
    )
  }

  setState(id: IOrder['_id']) {
    this._orderService.editStateOrder(id).subscribe(
      ({ message }: IResult) => {
        this._swal.toast({ text: message, icon: 'success' });
        this.getOrders();
        this.getOrder(id);
      }
    )
  }

  setStatus(id: IOrder['_id'], status: IOrder['status']) {
    this._orderService.editStatusOrder(id, status).subscribe(
      ({ message }: IResult) => {
        this._swal.toast({ text: message, icon: 'success' })
        this.getOrders();
        this.getOrder(id);
      }
    )
  }

  getOrder(id: IOrder['_id']) {
    this._orderService.getOrder(id).subscribe(
      ({ data }: IResult) => {
        const view: IView = {
          type: 'Orden para el',
          _id: data._id,
          id: data.dateDelivery,
          name: data.dateDelivery,
          img: data.customer.logo,
          description: `Ordern del cliente ${data.customer.legalName}`,
          status: data.status,
          edit: {
            route: ['production', 'order', 'edit', data._id],
            actions: [
              {
                type: 'link',
                action: data.state === 'PRODUCED' || 'SENT' || 'DELIVERED'
                  ? 'Obtener factura'
                  : 'La orden aún no ah sido producida',
                link: ['/'],
                disabled:
                  data.state === 'RECEIVED'
                  || data.state === 'PRODUCING'
              },
              {
                type: 'button',
                action: data.state === 'RECEIVED'
                  ? 'Pasar a producción'
                  : data.state === 'PRODUCING'
                    ? 'Producida'
                    : data.state === 'PRODUCED'
                      ? 'Enviar'
                      : data.state === 'SENT'
                        ? 'Entregada'
                        : 'La orden fue entregada',
                handleAction: () => this.setState(data._id),
                disabled: data.state === 'DELIVERED'
              },
              {
                type: 'button',
                action: data.status ? 'Desactivar' : 'Activar',
                handleAction: () => this.setStatus(data._id, data.status),
                textColor: data.status ? 'text-red-500' : 'text-green-500',
                disabled: data.state !== 'RECEIVED'
              }
            ]
          },
          sections: [
            {
              nameSection: 'Datos de la orden',
              elements: [
                {
                  key: 'Estado',
                  value: data.state === 'RECEIVED'
                    ? 'Recibida'
                    : data.state === 'PRODUCING'
                      ? 'Produciendo'
                      : data.state === 'PRODUCED'
                        ? 'Producida'
                        : data.state === 'SENT'
                          ? 'Enviada'
                          : 'Entregada'
                }
              ]
            }
          ]
        }
        data.items.map((item: any) => {
          view.sections![0].elements.push({ key: 'Producto', value: `${item.quantity} - ${item.product.description}`})
        })
        console.log(view)
        this._viewService.viewObservableData(view);
        this._viewService.toggleSlideOver()
      }
    )
  }

}
