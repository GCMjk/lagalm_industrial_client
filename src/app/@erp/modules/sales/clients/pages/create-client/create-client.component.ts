import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '@erp-core/services/client.service';
import { IClients } from '@erp-core/interfaces/clients.interface';
declare var $: any;

import { SwalService } from '@erp/core/services/swal.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {

  public client: IClients = {
    legalName: '',
    bussinessActivity: {
      activity: '',
      description: ''
    },
    taxId: '',
    taxSystem: '',
    taxEmail: '',
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
    type: ''
  }

  public btnRegister = false;
  public token: any = localStorage.getItem('token');

  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _swal: SwalService
  ) {

  }

  register(registerForm: any) {
    if (registerForm.valid) {
      this.btnRegister = true;
      this._clientService.registerClient(this.client, this.token).subscribe(
        response => {
          if (response.client === undefined) {
            this._swal.toast({ text: response.message, icon: 'error' });
            this.btnRegister = false;
          } else {
            this.btnRegister = false;
            this._swal.toast({ text: response.message, icon: 'success' });
            this._router.navigate(['/clients/1']);
          }
        }
      )
    } else {
      this._swal.toast({ text: 'Completa el formulario', icon: 'info' });
    }
  }

}
