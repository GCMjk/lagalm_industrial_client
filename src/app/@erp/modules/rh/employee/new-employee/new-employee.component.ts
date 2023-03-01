import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SwalService } from '@erp-core/services/swal.service';
import { EmployeeService } from '@erp-core/services/employee.service';
import { ILogged } from '@erp-core/interfaces/rrhh/employee.interface';
import states from '@erp-core/const/states';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {

  public form: FormGroup;
  public token: any = localStorage.getItem('token');
  public states = states;

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _router: Router,
    private _swal: SwalService
  ) {
    this.form = _fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      curp: ['', [
        Validators.required,
        Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)
      ]],
      address: this._fb.group({
        street: ['', Validators.required],
        interior: '',
        exterior: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        municipality: '',
        state: ['', Validators.required],
        country: ['', Validators.required],
        zip: ['', [
          Validators.required,
          Validators.pattern(/^[0-5][1-9]{3}[0-9]$/)
        ]],
        streets: this._fb.group({
          a: '',
          b: ''
        })
      }),
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      ]],
      role: 'USER',
      avatar: '',
      job: this._fb.group({
        employeeNumber: ['', [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]],
        rfc: ['', [
          Validators.required,
          Validators.pattern(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)
        ]],
        schooling: ['', Validators.required],
        nss: ['', [
          Validators.required,
          Validators.pattern(/^(\d{2})(\d{2})(\d{2})\d{5}$/)
        ]],
        infonavitCredit: [false, Validators.required],
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
            Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
          ]],
          end: ['', [
            Validators.required,
            Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
          ]]
        }),
        salary: ['', [
          Validators.required,
          Validators.pattern(/^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/)
        ]],
        accountNumber: ['', [
          Validators.required,
          Validators.pattern(/[0-9]{15,16}|(([0-9]{4}\s){3}[0-9]{3,4})/)
        ]]
      })
    });
  }

  new() {

    if (!this.form.invalid) {
      this._employeeService.registerEmployee(this.form.value, this.token).subscribe(
        ({ message }: ILogged) => {
          this._swal.toast({ text: message, icon: 'success' });
          this._router.navigate(['../', '1']);
        },
        ({ error: { message } }) => {
          this._swal.toast({ text: message, icon: 'error' })
        }
      )
    } else {
      this._swal.toast({ text: 'Completa el formulario', icon: 'info' });
    }
  }

  get fc() {
    return this.form;
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

  get workAreaField() {
    return this.form.get('job.workArea') as FormArray;
  }

}
