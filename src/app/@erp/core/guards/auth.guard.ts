import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@erp-core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _router: Router,
    private _employeeService: TokenService
  ) {}

  canActivate(): boolean {
    let access: boolean = this._employeeService.isAuth();

    if(!access) {
      this._router.navigate(['app', 'auth', 'login']);
    }
    return true;
  }
  
}
