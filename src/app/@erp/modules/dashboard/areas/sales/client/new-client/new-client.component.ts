import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '@erp-core/services/common/notification.service';
import { ClientService } from '@erp-core/services/sales/client.service';

import { IResult } from '@erp-core/interfaces/common/result.interface';
import { email, phone, number, zip, rfc,   } from '@erp-core/constants';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html'
})
export class NewClientComponent {

  public form: FormGroup;
  public taxSystem = [
    { key: '601', value: 'General de Ley Personas Morales' },
    { key: '603', value: 'Personas Morales con Fines no Lucrativos' },
    { key: '605', value: 'Sueldos y Salarios e Ingresos Asimilados a Salarios' },
    { key: '606', value: 'Arrendamiento' },
    { key: '608', value: 'Demás ingresos' },
    { key: '609', value: 'Consolidación' },
    { key: '610', value: 'Residentes en el Extranjero sin Establecimiento Permanente en México' },
    { key: '611', value: 'Ingresos por Dividendos (socios y accionistas)' },
    { key: '612', value: 'Personas Físicas con Actividades Empresariales y Profesionales' },
    { key: '614', value: 'Ingresos por intereses' },
    { key: '616', value: 'Sin obligaciones fiscales' },
    { key: '620', value: 'Sociedades Cooperativas de Producción que optan por diferir sus ingresos' },
    { key: '621', value: 'Incorporación Fiscal' },
    { key: '622', value: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
    { key: '623', value: 'Opcional para Grupos de Sociedades' },
    { key: '624', value: 'Coordinados' },
    { key: '628', value: 'Hidrocarburos' },
    { key: '607', value: 'Régimen de Enajenación o Adquisición de Bienes' },
    { key: '629', value: 'De los Regímenes Fiscales Preferentes y de las Empresas Multinacionales' },
    { key: '630', value: 'Enajenación de acciones en bolsa de valores' },
    { key: '615', value: 'Régimen de los ingresos por obtención de premios' },
    { key: '625', value: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas' },
    { key: '626', value: 'Régimen Simplificado de Confianza' }
  ];
  public uses = [
    { key: 'G01', value: 'Adquisición de mercancías' },
    { key: 'G02', value: 'Devoluciones, descuentos o bonificaciones' },
    { key: 'G03', value: 'Gastos en general' },
    { key: 'I01', value: 'Construcciones' },
    { key: 'I02', value: 'Mobiliario y equipo de oficina por inversiones' },
    { key: 'I03', value: 'Equipo de transporte' },
    { key: 'I04', value: 'Equipo de computo y accesorios' },
    { key: 'I05', value: 'Dados, troqueles, moldes, matrices y herramental' },
    { key: 'I06', value: 'Comunicaciones telefónicas' },
    { key: 'I07', value: 'Comunicaciones satelitales' },
    { key: 'I08', value: 'Otra maquinaria y equipo' },
    { key: 'D01', value: 'Honorarios médicos, dentales y gastos hospitalarios' },
    { key: 'D02', value: 'Gastos médicos por incapacidad o discapacidad' },
    { key: 'D03', value: 'Gastos funerales' },
    { key: 'D04', value: 'Donativos' },
    { key: 'D05', value: 'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)' },
    { key: 'D06', value: 'Aportaciones voluntarias al SAR' },
    { key: 'D07', value: 'Primas por seguros de gastos médicos' },
    { key: 'D08', value: 'Gastos de transportación escolar obligatoria' },
    { key: 'D09', value: 'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones' },
    { key: 'D10', value: 'Pagos por servicios educativos (colegiaturas)' },
    { key: 'S01', value: 'Sin efectos fiscales' },
    { key: 'CP01', value: 'Pagos' },
    { key: 'CN01', value: 'Nómina' },
  ];
  public paymentForms = [
    { key: '01', value: 'Efectivo' },
    { key: '02', value: 'Cheque nominativo' },
    { key: '03', value: 'Transferencia electrónica de fondos' },
    { key: '04', value: 'Tarjeta de crédito' },
    { key: '05', value: 'Monedero electrónico' },
    { key: '06', value: 'Dinero electrónico' },
    { key: '08', value: 'Vales de despensa' },
    { key: '12', value: 'Dación en pago' },
    { key: '13', value: 'Pago por subrogación' },
    { key: '14', value: 'Pago por consignación' },
    { key: '15', value: 'Condonación' },
    { key: '17', value: 'Compensación' },
    { key: '23', value: 'Novación' },
    { key: '24', value: 'Confusión' },
    { key: '25', value: 'Remisión de deuda' },
    { key: '26', value: 'Prescripción o caducidad' },
    { key: '27', value: 'A satisfacción del acreedor' },
    { key: '28', value: 'Tarjeta de débito' },
    { key: '29', value: 'Tarjeta de servicios' },
    { key: '30', value: 'Aplicación de anticipos' },
    { key: '31', value: 'Intermediario pagos' },
    { key: '99', value: 'Por definir' }
  ];
  public paymentMethods = [
    { key: 'PUE', value: 'Pago en una sola exhibición (de contado)' },
    { key: 'PPD', value: 'Pago en parcialidades o diferido (total o parcialmente a crédito)' }
  ];
  public currencies = [
    { key: 'MXN', value: 'Pesos Mexicanos' },
    { key: 'USD', value: 'Dolares Americanos' }
  ];

  constructor(
    private _router: Router,
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
  }

  new() {
    
    if (this.form.valid) {
      this._clientService.registerClient(this.form.value).subscribe(
        ({ message }: IResult) => {
          this._router.navigate(['../']);
          this._notificationService.notificationObservableData({
            title: 'Cliente creado',
            text: message,
            icon: 'success'
          });
        },
        ({ error: { message } }) => {
          this._notificationService.notificationObservableData({
            title: 'Error',
            text: message,
            icon: 'error'
          })
        }
      )
    } else {
      this._notificationService.notificationObservableData({
        title: 'Complete los datos del formulario', 
        text: 'Verifique que todos los campos hayan sido resueltos', 
        icon: 'warning'
      });
    }
  }

  get ctrl() {
    return this.form.controls;
  }

  get contactPersonalizedField() {
    return this.form.get('contact.contactPersonalized') as FormArray;
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

}
