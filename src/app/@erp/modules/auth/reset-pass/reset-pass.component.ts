import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SwalService } from '@erp-core/services/swal.service';
import { EmployeeService } from '@erp/core/services/employee.service';
import { email } from '@erp/core/constants';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html'
})
export class ResetPassComponent implements OnInit {

  form: FormGroup;
  token: string = localStorage.getItem('token')!;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _swal: SwalService,
    private _employeeService: EmployeeService
  ) {
    this.form = this._fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(email)
      ]]
    })
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['app']);
    }
  }

  resetPass() {
    if(this.form.valid) {
      this._swal.toast({ text: `Se te enviara un correo a ${this.ctrl['email'].value}`, icon: 'success' })
    }
  }

  get ctrl() {
    return this.form.controls;
  }

}
