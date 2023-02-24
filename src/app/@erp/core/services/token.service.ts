import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ILogged } from '@erp-core/interfaces/rrhh/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public url = environment.url;

  constructor(
    private _http: HttpClient
  ) { }

  token(token: ILogged['token']): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'token', { headers })
  }

  isAuth() {
    const token: string | null  = localStorage.getItem('token');

    try {
      const helper = new JwtHelperService();
      var decodeToken = helper.decodeToken(token as string);

      if(!token) {
        localStorage.clear();
        return false;
      }
      if(!decodeToken) {
        localStorage.clear();
        return false;
      }
      if(helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }
    } catch(e) {
      localStorage.clear();
      return false;
    }

    return true;
  }

}
