import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IEmployee, ILogin, ILogged } from '@erp-core/interfaces/rrhh/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  registerEmployee(data: IEmployee, token: ILogged['token']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'employee', data, { headers })
  }

  editEmployee(id: IEmployee['_id'], data: IEmployee, token: ILogged['token']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'employee/' + id, data, { headers })
  }

  getEmployee(id: IEmployee['_id'], token: ILogged['token']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'employee/' + id, { headers })
  }

  getEmployees(token: ILogged['token'], page: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'employees/' + page, { headers })
  }

  getEmployeesById(token: ILogged['token'], filter: any, page: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'employees/search/' + filter + '/' + page, { headers })
  }

  editStatusEmployee(id: IEmployee['_id'], status: IEmployee['status'], token: ILogged['token']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'employee/status/' + id, { status }, { headers })
  }

  login(data: ILogin): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, { headers })
  }

}
