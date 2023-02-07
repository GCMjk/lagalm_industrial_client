import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@erp-core/services/employee.service';
import { IEmployee } from '@erp-core/interfaces/employee.interface';
declare var $: any;

@Component({
  selector: 'app-edit-employee-page',
  templateUrl: './edit-employee-page.component.html',
  styleUrls: ['./edit-employee-page.component.scss']
})
export class EditEmployeePageComponent implements OnInit {

  public id = '';
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
      state: '',
      country: '',
      zip: '',
      streets: {
          a: '',
          b: '',
      }
    },
    email: '',
    role: '',
    job: {
      employeeNumber: '',
      rfc: '',
      schooling: '',
      nss: '',
      workArea: [{
        area: '',
        range: '',
      }],
      description: '',
      schedule: {
        start: '',
        end: ''
      },
      accountNumber: ''
    }
  }

  public btnEdit = false;
  public token: any = localStorage.getItem('token');
  public loadData = false;
  public data = false;

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.loadData = true;
        this._employeeService.getEmployee(this.id, this.token).subscribe(
          response => {
            if (response.employee != undefined) {
              this.employee = response.employee;
              this.data = true;
              this.loadData = false;
            } else {
              this.data = false;
              this.loadData = false;
            }
          }
        )
      }
    )
  }

  edit(editForm: any) {
    if (editForm.valid) {
      this.btnEdit = true;
      this._employeeService.editEmployee(this.id, this.employee, this.token).subscribe(
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
            this.btnEdit = false;
          } else {
            this.btnEdit = false;
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
