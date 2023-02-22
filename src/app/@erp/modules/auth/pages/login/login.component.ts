import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '@erp-core/services/employee.service';
import { SwalService } from '@erp-core/services/swal.service';

import { ILogged, ILogin } from '@erp-core/interfaces/rrhh/employee.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: ILogin = {
    email: '',
    password: ''
  }
  public token: string = localStorage.getItem('token')!;

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _swal: SwalService
  ) { }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['app', 'dashboard']);
    }
  }

  login(LoginForm: any) {

    if (LoginForm.valid) {
      this._employeeService.login(this.user).subscribe(
        ({ message, token, data }: ILogged) => {
          this._swal.toast({ text: message, icon: 'success' });
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('_id', data._id!);
          this._router.navigate(['app', 'dashboard']);
        },
        ({ error: { message } }) => {
          this._swal.toast({ text: message, icon: 'error' })
        }
      )
    } else {
      this._swal.toast({ text: 'Ingrese sus datos', icon: 'info' })
    }

  }

}
