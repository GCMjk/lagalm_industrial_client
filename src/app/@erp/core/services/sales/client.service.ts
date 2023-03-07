import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { ILogged } from '@erp-core/interfaces/rh/employee.interface';
import { IClient } from '@erp-core/interfaces/sales/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url = environment.url;
  private token: ILogged['token'];

  constructor(
    private _http: HttpClient
  ) {
    this.token = localStorage.getItem('token') as string;
  }

  registerClient(data: IClient): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.post(this.url + 'client', data, { headers: headers })
  }

  editClient(id: IClient['_id'], data: IClient): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'client/' + id, data, { headers: headers })
  }

  getClient(id: IClient['_id']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'client/' + id, { headers: headers })
  }

  getClients(page: number = 1): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'clients/' + page, { headers: headers })
  }

  getClientsById(filter: any, page: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'clients/search/' + filter + '/' + page, { headers: headers })
  }

  editStatusClient(id: IClient['_id'], status: IClient['status']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'client/status/' + id, { status }, { headers: headers })
  }

}
