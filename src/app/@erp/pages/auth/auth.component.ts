import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/@erp/core/services/employee.service';
declare var $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public user: any = {
    email: '',
    password: ''
  }
  public token: any = localStorage.getItem('token');

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/dashboard']);
    }
  }

  login(LoginForm: any) {

    if (LoginForm.valid) {
      this._employeeService.login(this.user).subscribe(
        response => {
          if (response.employee === undefined) {
            $.notify(response.message, {
              type: 'danger',
              spacing: 10,
              timer: 2000,
              placement: {
                from: 'top',
                align: 'right'
              },
              delay: 1000,
              animate: {
                enter: 'animated ' + 'bounce',
                exit: 'animated ' + 'bounce'
              }
            });
          } else {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.employee));
            localStorage.setItem('_id', response.employee._id);
            this._router.navigate(['/dashboard']);
          }
        }
      )
    } else {
      $.notify('Ingrese todos sus datos.', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    }

  }

}
