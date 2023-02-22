import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@erp-core/services/employee.service';
import { IEmployee } from '@erp/core/interfaces/rrhh/employee.interface';

import { SwalService } from '@erp-core/services/swal.service';

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
    gender: 'MALE',
    maritalStatus: 'DIVORCED',
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
    role: 'USER',
    job: {
      employeeNumber: '',
      rfc: '',
      schooling: 'CAREER TECH',
      nss: '',
      workArea: [{
        area: 'CUSTOME SERVICE',
        range: 'ASSISTANT',
      }],
      description: '',
      schedule: {
        start: '',
        end: ''
      },
      accountNumber: ''
    },
    lastSession: '',
    status: false
  }

  public btnEdit = false;
  public token: any = localStorage.getItem('token');
  public loadData = false;
  public data = false;

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _swal: SwalService
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
            this._swal.toast({ text: response.message, icon: 'error'});
            this.btnEdit = false;
          } else {
            this.btnEdit = false;
            this._swal.toast({ text: response.message, icon: 'success'});
            this._router.navigate(['/employees/1']);
          }
        }
      )
    } else {
      this._swal.toast({ text: 'Completa el formulario', icon: 'info'});
    }
  }

}
