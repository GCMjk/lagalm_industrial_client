import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '@erp-core/services/common/notification.service';
import { ClientService } from '@erp-core/services/sales/client.service';

import { IResult } from '@erp-core/interfaces/common/result.interface';
import { email, phone, number, zip, rfc } from '@erp-core/constants';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html'
})
export class EditClientComponent implements OnInit {

  public id = '';
  public form: FormGroup;
  public types;
  public activities;
  public taxSystems;
  public uses;
  public paymentMethods;
  public paymentForms;
  public currencies;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _notificationService: NotificationService,
    private _clientService: ClientService
  ) {
    this.form = _fb.group({
      legalName: ['', Validators.required],
      bussinessActivity: _fb.group({
        activity: ['', Validators.required],
        description: ['', Validators.required]
      }),
      tax: _fb.group({
        taxID: ['', [
          Validators.required,
          Validators.pattern(rfc)
        ]],
        taxSystem: ['', Validators.required],
        taxEmail: ['', [
          Validators.required,
          Validators.pattern(email)
        ]],
        daysOfExpiration: ['', [
          Validators.required,
          Validators.pattern(number)
        ]],
        use: ['', Validators.required],
        paymentForm: ['', Validators.required],
        paymentMethod: ['', Validators.required], 
        currency: ['', Validators.required], 
        taxIncluded: false
      }),
      contact: this._fb.group({
        email: ['', [
          Validators.required,
          Validators.pattern(email)
        ]],
        phone: ['', [
          Validators.required,
          Validators.pattern(phone)
        ]],
        web: '',
        contactPersonalized: this._fb.array([
          this._fb.group({
            title: ['', Validators.required],
            name: ['', Validators.required],
            workPosition: ['', Validators.required],
            email: ['', [
              Validators.required,
              Validators.pattern(email)
            ]],
            phone: ['', [
              Validators.required,
              Validators.pattern(phone)
            ]]
          })
        ])
      }),
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
      type: ['', Validators.required]
    });
    this.types = this._clientService.types;
    this.activities = this._clientService.activities;
    this.taxSystems = this._clientService.taxSystems;
    this.uses = this._clientService.uses;
    this.paymentMethods = this._clientService.paymentMethods;
    this.paymentForms = this._clientService.paymentForms;
    this.currencies = this._clientService.currencies;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._clientService.getClient(this.id).subscribe(
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
      this._clientService.editClient(this.id, this.form.value).subscribe(
        ({ message }: IResult ) => {
            this._notificationService.notificationObservableData({
              title: 'Cliente editado',
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

  addContactPersonalized() {
    this.contactPersonalizedField.push(this._fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      workPosition: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(email)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(phone)
      ]]
    }));
  }

  delContactPersonalized() {
    this.contactPersonalizedField.removeAt(-1);
  }

  get ctrl() {
    return this.form.controls;
  }

  get contactPersonalizedField() {
    return this.form.get('contact.contactPersonalized') as FormArray;
  }

  get ctrlTax() {
    return this.form.controls['tax'] as FormGroup;
  }

  get ctrlAddress() {
    return this.form.controls['address'] as FormGroup;
  }

  get ctrlContact() {
    return this.form.controls['contact'] as FormGroup;
  }

}
