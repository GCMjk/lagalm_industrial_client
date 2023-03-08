import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { IOrder } from '@erp-core/interfaces/production/order.interface';
import { ILogged } from '@erp-core/interfaces/rh/employee.interface';
import { IClient } from '@erp-core/interfaces/sales/client.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public url = environment.url;
  private token: ILogged['token'];

  constructor(
    private _http: HttpClient
  ) {
    this.token = localStorage.getItem('token') as string;
  }

  registerOrder(data: IOrder): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.post(this.url + 'order', data, { headers: headers });
  }

  editOrder(id: IOrder['_id'], data: IOrder): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'order/' + id, data, { headers: headers });
  }

  getOrder(id: IOrder['_id']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'order/' + id, { headers: headers });
  }

  getOrders(page: number = 1): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'orders/' + page, { headers: headers });
  }

  getOrdersByClient(client: IClient['_id'], page: number = 1): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'orders/search/' + client + '/' + page, { headers: headers });
  }

  editStateOrder(id: IOrder['_id']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'order/state/' + id, undefined, { headers: headers });
  }

  editStatusOrder(id: IOrder['_id'], status: IOrder['status']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'order/status/' + id, { status }, { headers: headers });
  }

}
