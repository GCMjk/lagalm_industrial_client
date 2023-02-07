import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '@erp-core/services/employee.service';
import { IEmployee } from '@erp-core/interfaces/employee.interface';
declare var $: any;

@Component({
  selector: 'app-create-employee-page',
  templateUrl: './create-employee-page.component.html',
  styleUrls: ['./create-employee-page.component.scss']
})
export class CreateEmployeePageComponent {

  public employee: IEmployee = {
    name: '',
    lastname: '',
    birthday: '',
    gender: '',
    maritalStatus: '',
    curp: '',
    address: {
      street: '',
      interior: '',
      exterior: '',
      neighborhood: '',
      city: '',
      municipality: '',
      state: 'MEX',
      country: 'México',
      zip: '',
      streets: {
          a: '',
          b: '',
      }
    },
    email: '',
    role: 'USER',
    avatar: 'a',
    job: {
      employeeNumber: '',
      rfc: '',
      schooling: '',
      nss: '',
      infonavitCredit: true,
      workArea: [{
        area: '',
        range: '',
      }],
      description: '',
      schedule: {
        start: '',
        end: ''
      },
      salary: 0,
      accountNumber: ''
    },
    status: true
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
