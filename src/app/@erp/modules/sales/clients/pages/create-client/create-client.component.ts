import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '@erp-core/services/client.service';
import { IClients } from '@erp-core/interfaces/clients.interface';
declare var $: any;

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
    private _router: Router
  ) {

  }

  register(registerForm: any) {
    if (registerForm.valid) {
      this.btnRegister = true;
      this._clientService.registerClient(this.client, this.token).subscribe(
        response => {
          if (response.client === undefined) {
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
            this._router.navigate(['/clients/1']);
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
