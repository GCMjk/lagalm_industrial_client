import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { IEmployee, ILogin, ILogged } from '@erp/core/interfaces/rh/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public url = environment.url;
  private token: ILogged['token'];

  constructor(
    private _http: HttpClient
  ) {
    this.token = localStorage.getItem('token') as string;
  }

  registerEmployee(data: IEmployee): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.post(this.url + 'employee', data, { headers });
  }

  editEmployee(id: IEmployee['_id'], data: IEmployee): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'employee/' + id, data, { headers });
  }

  getEmployee(id: IEmployee['_id']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'employee/' + id, { headers });
  }

  getEmployees(page: number = 1): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'employees/' + page, { headers });
  }

  getEmployeesById(filter: any, page: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.get(this.url + 'employees/search/' + filter + '/' + page, { headers });
  }

  editStatusEmployee(id: IEmployee['_id'], status: IEmployee['status']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this._http.put(this.url + 'employee/status/' + id, { status }, { headers });
  }

  login(data: ILogin): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, { headers });
  }

}
