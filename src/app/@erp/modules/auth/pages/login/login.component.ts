import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { EmployeeService } from '@erp-core/services/employee.service';
import { SwalService } from '@erp-core/services/swal.service';
import { ILogged, ILogin } from '@erp-core/interfaces/rrhh/employee.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public token: string = localStorage.getItem('token')!;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _swal: SwalService,
    private _employeeService: EmployeeService
  ) { 
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['app']);
    }
  }

  login() {
    this._employeeService.login(this.loginForm.value).subscribe(
      ({ message, token, data }: ILogged) => {
        this._swal.toast({ text: message, icon: 'success' });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('_id', data._id!);
        this._router.navigate(['app']);
      },
      ({ error: { message } }) => {
        this._swal.toast({ text: message, icon: 'error' })
      }
    )

  }

  get loginControl() {
    return this.loginForm['controls'];
  }

}
