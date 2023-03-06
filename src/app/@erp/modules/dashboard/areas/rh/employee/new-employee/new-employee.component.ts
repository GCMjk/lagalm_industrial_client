import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '@erp/core/services/common/notification.service';
import { EmployeeService } from '@erp-core/services/employee.service';
import { ILogged } from '@erp-core/interfaces/rrhh/employee.interface';
import { states, email, curp, zip, phone, employeeNumber, rfc, nss, time24, salary, cardNumber } from '@erp-core/constants';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {

  public form: FormGroup;
  public loading = false;
  public token: any = localStorage.getItem('token');

  constructor(
    private _router: Router,
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

  new() {

    if (this.form.valid) {
      console.log(this.form)
      this.loading = true;
      /* this._employeeService.registerEmployee(this.form.value, this.token).subscribe(
        ({ message }: ILogged) => {
          this._swal.toast({ text: message, icon: 'success' });
          // FIX Route
          this._router.navigate(['../']);
          this.loading = false;
        },
        ({ error: { message } }) => {
          this._swal.toast({ text: message, icon: 'error' });
          this.loading = false;
        }
      ) */
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
