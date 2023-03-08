import { Component, OnInit } from '@angular/core';

import { SwalService } from '@erp-core/services/swal.service';
import { ViewService } from '@erp-core/services/common/view.service';
import { ClientService } from '@erp-core/services/sales/client.service';

import { IClient } from '@erp-core/interfaces/sales/client.interface';
import { IResult } from '@erp-core/interfaces/common/result.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {

  public clients: Array<IClient> = [];
  
  constructor(
    private _swal: SwalService,
    private _viewService: ViewService,
    private _clientService: ClientService
  ) {  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this._clientService.getClients().subscribe(
      ({ data }: IResult) => {
        this.clients = data;
      }
    )
  }

  setStatus(id: IClient['_id'], status: IClient['status']) {
    this._clientService.editStatusClient(id, status).subscribe(
      ({ message }: IResult) => {
        this._swal.toast({ text: message, icon: 'success' })
        this.getClients();
        this.getClient(id);
      }
    )
  }

  getClient(id: IClient['_id']) {
    this._clientService.getClient(id).subscribe(
      ({ data }: IResult) => {
        this._viewService.viewObservableData({
          type: 'Cliente',
          _id: data._id,
          id: data.legalName,
          img: data.logo,
          name: data.legalName,
          description: data.contact.email,
          status: data.status,
          edit: {
            route: ['sales', 'client', 'edit', data._id],
            actions: [
              {
                type: 'button',
                action: data.status ? 'Desactivar' : 'Activar',
                handleAction: () => this.setStatus(data._id, data.status),
                textColor: data.status ? 'text-red-500' : 'text-green-500'
              }
            ]
          },
          sections: [
            {
              nameSection: 'Datos de la empresa',
              elements: [
                {
                  key: 'Actividad empresarial',
                  value: data.bussinessActivity.activity
                },
                {
                  key: 'Descripción',
                  value: data.bussinessActivity.description
                },
                {
                  key: 'Tipo',
                  value: data.type === 'CLIENT' ? 'Cliente' : 'Prospecto'
                }
              ]
            },
            {
              nameSection: data.tax ? 'Facturación' : 'No hay datos de facturación',
              elements: [
                {
                  key: 'RFC',
                  value: data.tax?.taxID ? data.tax?.taxID : 'Sin registro' 
                },
                {
                  key: 'Régimen fiscal',
                  value: data.tax?.taxSystem ? data.tax?.taxSystem : 'Sin registro' 
                },
                {
                  key: 'Dirección',
                  value: data.address 
                    ? `${data.address?.municipality} ${data.address?.state}, ${data.address?.country} ${data.address?.zip}`
                    : 'Sin registro' 
                },
                {
                  key: 'Correo de facturación',
                  value: data.tax?.taxEmail ? data.tax?.taxEmail : 'Sin registro' 
                },
                {
                  key: 'Uso de CFDI',
                  value: data.tax?.use ? data.tax?.use : 'Sin registro' 
                },
                {
                  key: 'Días de pago',
                  value: data.tax?.daysOfExpiration ? data.tax?.daysOfExpiration + ' días' : 'Sin registro' 
                },
                {
                  key: 'Forma de pago',
                  value: data.tax?.paymentForm ? data.tax?.paymentForm : 'Sin registro' 
                },
                {
                  key: 'Metodo de pago',
                  value: data.tax?.paymentMethod ? data.tax?.paymentMethod : 'Sin registro' 
                },
                {
                  key: 'Moneda de pago',
                  value: data.tax?.currency ? data.tax?.currency : 'Sin registro' 
                }
              ]
            },
            {
              nameSection: 'Contacto',
              elements: [
                {
                  key: 'Correo',
                  value: data.contact.email
                },
                {
                  key: 'Télefono',
                  value: data.contact.phone
                },
                {
                  key: 'Web',
                  value: data.contact.web
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
