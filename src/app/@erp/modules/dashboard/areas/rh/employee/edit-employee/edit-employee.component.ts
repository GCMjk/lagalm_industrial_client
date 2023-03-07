import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '@erp/core/services/common/notification.service';
import { EmployeeService } from '@erp-core/services/employee.service';
import { IEmployee } from '@erp/core/interfaces/rrhh/employee.interface';
import { IResult } from '@erp/core/interfaces/common/result.interface';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {

  /* public id = '';
  public form!: FormGroup;
  public loading = false;
  public token: any = localStorage.getItem('token');

  public btnEdit = false;
  public token: any = localStorage.getItem('token');
  public loadData = false;
  public data = false;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _notificationService: NotificationService,
    private _employeeService: EmployeeService
  ) {  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._employeeService.getEmployee(this.id, this.token).subscribe(
          ({ data }: IResult) => {
            this.form = data;
          },
          ({ message }: IResult) => {
            console.log(message);
          }
        )
      }
    )
  }

  edit() {

    if (this.form.valid) {
      this._employeeService.editEmployee(this.id, this.form, this.token).subscribe(
        ({ message }: IResult ) => {
            this._notificationService.notificationObservableData({
              title: 'Empleado editado',
              text: message,
              icon: 'success'
            });
        }
      )
    } else {
      this._notificationService.notificationObservableData({ 
        text: 'Completa el formulario', 
        icon: 'info'
      });
    }

  } */

}
