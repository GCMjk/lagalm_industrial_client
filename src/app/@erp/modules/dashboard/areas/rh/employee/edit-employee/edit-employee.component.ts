import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '@erp-core/services/common/notification.service';
import { EmployeeService } from '@erp-core/services/rh/employee.service';

import { IResult } from '@erp-core/interfaces/common/result.interface';
import { states, email, curp, zip, phone, employeeNumber, rfc, nss, time24, salary, cardNumber } from '@erp-core/constants';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent implements OnInit {

  public id = '';
  public form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _notificationService: NotificationService,
    private _employeeService: EmployeeService
  ) {
    this.form = _fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      curp: ['', [
        Validators.required,
        Validators.pattern(curp)
      ]],
      address: this._fb.group({
        street: ['', Validators.required],
        interior: '',
        exterior: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        municipality: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zip: ['', [
          Validators.required,
          Validators.pattern(zip)
        ]],
        streets: this._fb.group({
          a: '',
          b: ''
        })
      }),
      email: ['', [
        Validators.required,
        Validators.pattern(email)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(phone)
      ]],
      role: ['USER', Validators.required],
      avatar: '',
      job: this._fb.group({
        employeeNumber: ['', [
          Validators.required,
          Validators.pattern(employeeNumber)
        ]],
        rfc: ['', [
          Validators.required,
          Validators.pattern(rfc)
        ]],
        schooling: ['', Validators.required],
        nss: ['', [
          Validators.required,
          Validators.pattern(nss)
        ]],
        infonavitCredit: false,
        workArea: this._fb.array([
          this._fb.group({
            area: ['', Validators.required],
            range: ['', Validators.required]
          })
        ]),
        description: ['', Validators.required],
        schedule: this._fb.group({
          start: ['', [
            Validators.required,
            Validators.pattern(time24)
          ]],
          end: ['', [
            Validators.required,
            Validators.pattern(time24)
          ]]
        }),
        salary: ['', [
          Validators.required,
          Validators.pattern(salary)
        ]],
        accountNumber: ['', [
          Validators.required,
          Validators.pattern(cardNumber)
        ]]
      })
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._employeeService.getEmployee(this.id).subscribe(
          ({ data }: IResult) => {
            this.form.patchValue(data);
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
      this._employeeService.editEmployee(this.id, this.form.value).subscribe(
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
        title: 'Complete los datos del formulario', 
        text: 'Verifique que todos los campos hayan sido resuletos', 
        icon: 'warning'
      })
    }

  }

  get ctrl() {
    return this.form.controls;
  }

  get workAreaField() {
    return this.form.get('job.workArea') as FormArray;
  }

  addWorkArea() {
    this.workAreaField.push(this._fb.group({
      area: ['', Validators.required],
      range: ['', Validators.required]
    }));
  }

  delWorkArea() {
    this.workAreaField.removeAt(-1);
  }

}
