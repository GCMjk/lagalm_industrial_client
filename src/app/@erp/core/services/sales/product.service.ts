import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { IProduct } from '@erp-core/interfaces/sales/product.interface';
import { ILogged } from '@erp-core/interfaces/rh/employee.interface';
import { IClient } from '@erp-core/interfaces/sales/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url = environment.url;
  private token: ILogged['token'];

  constructor(
    private _http: HttpClient
  ) {
    this.token = localStorage.getItem('token') as string;
  }

  registerProduct(data: IProduct): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.post(this.url + 'product', data, { headers: headers });
  }

  editProduct(id: IProduct['_id'], data: IProduct): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'product/' + id, data, { headers: headers });
  }

  getProduct(id: IProduct['_id']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'product/' + id, { headers: headers });
  }

  getProducts(page: number = 1): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'products/' + page, { headers: headers });
  }

  getProductsByClient(client: IClient['_id'], page: number = 1): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'products/search/' + client + '/' + page, { headers: headers });
  }

  editStatusProduct(id: IProduct['_id'], status: IProduct['status']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'product/status/' + id, { status }, { headers: headers });
  }

  editAssignedProduct(id: IProduct['_id'], assigned: IProduct['assigned']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'product/assigned/' + id, { assigned }, { headers: headers });
  }

}
