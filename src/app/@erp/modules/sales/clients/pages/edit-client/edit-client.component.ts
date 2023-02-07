import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@erp-core/services/client.service';
import { IClients } from '@erp-core/interfaces/clients.interface';
declare var $: any;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  public id = '';
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
    type: '',
  }

  public btnEdit = false;
  public token: any = localStorage.getItem('token');
  public loadData = false;
  public data = false;

  constructor(
    private _clientService: ClientService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.loadData = true;
        this._clientService.getClient(this.id, this.token).subscribe(
          response => {
            if (response.client != undefined) {
              this.client = response.client;
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
      this._clientService.editClient(this.id, this.client, this.token).subscribe(
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
