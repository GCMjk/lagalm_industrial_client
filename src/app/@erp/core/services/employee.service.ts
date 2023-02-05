import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "../../../constants/global";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public url = GLOBAL.url;

  constructor(
    private _http: HttpClient
  ) { }

  registerEmployee(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'employee', data, { headers: headers })
  }

  editEmployee(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'employee/' + id, data, { headers: headers })
  }

  getEmployee(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'employee/' + id, { headers: headers })
  }

  getEmployees(token: any, page: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'employees/' + page, { headers: headers })
  }

  getEmployeesById(token: any, filter: any, page: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'employees/search/' + filter + '/' + page, { headers: headers })
  }

  editStatusEmployee(id: any, status: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'employee/status/' + id, status, { headers: headers })
  }

  login(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, { headers: headers })
  }

}
