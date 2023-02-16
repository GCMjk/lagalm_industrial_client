import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '@erp-core/services/client.service';
import { IClient } from '@erp-core/interfaces/client.interface';
import { IResponse } from '@erp-core/interfaces/response.interface';
declare var $: any;

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit {

  public token = localStorage.getItem('token');
  public clients: Array<IClient> = [];
  public clientsSearch: Array<IClient> = [];

  public itemsPerPage = 1;
  public total = 1;
  public pages = 1;
  public page = 1;
  public nextPage;
  public prevPage;

  public filter = '';
  public loadStatus = false;
  public loadData = false;

  constructor(
    private _clientService: ClientService,
    private _route: ActivatedRoute
  ) {

    this.nextPage = 1;
    this.prevPage = 1;

  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];
      this.page = page;

      if (!page) {
        page = 1;
      } else {
        this.nextPage = page + 1;
        this.prevPage = page - 1;
        if (this.prevPage === 0) {
          this.prevPage = 1;
        }
      }

      this._clientService.getClients(this.token, page).subscribe(
        (response: IResponse) => {
          console.log(response)
          this.itemsPerPage = response.itemsPerPage;
          this.total = response.total;
          this.pages = response.pages;
          this.clients = response.data;
          this.clientsSearch = this.clients;
        }
      )

    });
  }

  search() {
    if (this.filter) {
      this.loadData = true;
      const term = new RegExp(this.filter, 'i');
      this.clients = this.clientsSearch.filter(client => term.test(client.legalName) || term.test(client.bussinessActivity.activity) || term.test(client.contact.email) || term.test(client.taxId!));
      this.loadData = false;
    } else {
      this.clients = this.clientsSearch;
    }
  }

  setStatus(id: any, status: any) {
    this.loadStatus = true;
    this._clientService.editStatusClient(id, { status }, this.token).subscribe(
      () => {
        this.loadStatus = false;
        $('#delete-' + id).modal('hide');
        this.getClients();
      }
    );
  }

}
