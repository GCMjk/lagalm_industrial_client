import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '@erp-core/services/employee.service';

import { SwalService } from '@erp-core/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {
    email: '',
    password: ''
  }
  public token: any = localStorage.getItem('token');

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _swal: SwalService
  ) { }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/app']);
    }
  }

  login(LoginForm: any) {

    if (LoginForm.valid) {
      this._employeeService.login(this.user).subscribe(
        response => {
          if (response.employee === undefined) {
            this._swal.toast({ text: response.message, icon: 'error' });
          } else {
            this._swal.toast({ text: response.message, icon: 'success' })
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.employee));
            localStorage.setItem('_id', response.employee._id);
            this._router.navigate(['/dashboard']);
          }
        }
      )
    } else {
      this._swal.toast({ text: 'Ingrese sus datos', icon: 'info' })
    }

  }

}
