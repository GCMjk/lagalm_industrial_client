import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

declare var $: any;

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  public employee: any = {
    gender: '',
    maritalStatus: '',
    address: {
      state: 'Estado de México',
      streets: {
        a: '',
        b: ''
      },
      country: 'México'
    },
    role: '',
    avatar: 'a', // *
    job: {
      schooling: '',
      workAreaId: '',
      range: '',
      schedule: {
        start: '',
        end: ''
      }
    }
  }

  public btnRegister = false;
  public token: any = localStorage.getItem('token');

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router
  ) {

  }

  register(registerForm: any) {
    if (registerForm.valid) {
      this.btnRegister = true;
      this._employeeService.registerEmployee(this.employee, this.token).subscribe(
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
            this.btnRegister = false;
          } else {
            this.btnRegister = false;
            $.notify(response.message, {
              type: 'success',
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
            this._router.navigate(['/employees/1']);
          }
        }
      )
    } else {
      $.notify('Complete el formulario.', {
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