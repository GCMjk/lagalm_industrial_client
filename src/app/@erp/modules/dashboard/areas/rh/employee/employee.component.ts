import { Component, OnInit } from '@angular/core';

import { SwalService } from '@erp-core/services/swal.service';
import { ViewService } from '@erp-core/services/common/view.service';
import { EmployeeService } from '@erp-core/services/rh/employee.service';

import { IEmployee } from '@erp/core/interfaces/rh/employee.interface';
import { IResult } from '@erp-core/interfaces/common/result.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  public employees: Array<IEmployee> = [];
  
  constructor(
    private _swal: SwalService,
    private _viewService: ViewService,
    private _employeeService: EmployeeService
  ) {  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe(
      ({ data }: IResult) => {
        this.employees = data;
      }
    )
  }

  setStatus(id: IEmployee['_id'], status: IEmployee['status']) {
    this._employeeService.editStatusEmployee(id, status).subscribe(
      ({ message }: IResult) => {
        this._swal.toast({ text: message, icon: 'success' })
        this.getEmployees();
        this.getEmployee(id);
      }
    )
  }

  getEmployee(id: IEmployee['_id']) {
    this._employeeService.getEmployee(id).subscribe(
      ({ data }: IResult) => {
        this._viewService.viewObservableData({
          type: 'Empleado No.',
          _id: data._id,
          id: data.job.employeeNumber,
          img: data.avatar,
          name: data.fullnames,
          description: data.email,
          status: data.status,
          edit: {
            route: ['rh', 'employee', 'edit', data._id],
            actions: [
              {
                type: 'button',
                action: data.status ? 'Desactivar' : 'Activar',
                handleAction: () => this.setStatus(data._id, data.status),
                textColor: data.status ? 'text-red-500' : 'text-green-500'
              }
            ]
          },
          sections: [
            {
              nameSection: 'Datos personales',
              elements: [
                {
                  key: 'Fecha de nacimiento',
                  value: data.birthday
                },
                {
                  key: 'Género',
                  value: data.gender
                },
                {
                  key: 'Estado civil',
                  value: data.maritalStatus
                },
                {
                  key: 'CURP',
                  value: data.curp
                },
                {
                  key: 'RFC',
                  value: data.job.rfc
                },
                {
                  key: 'Dirección',
                  value: data.address.street
                },
                {
                  key: 'Télefono',
                  value: data.phone
                },
                {
                  key: 'Escolaridad',
                  value: data.schooling
                }
              ]
            },
            {
              nameSection: 'Datos laborales',
              elements: [
                {
                  key: 'Numero de Seguridad Social',
                  value: data.job.employeeNumber
                },
                {
                  key: 'Salario',
                  value: data.job.salary
                },
                {
                  key: 'Horario',
                  value: data.job.schedule.start
                },
                {
                  key: 'Area de trabajo',
                  value: data.job.workArea[0].area
                },
                {
                  key: 'Descripción',
                  value: data.job.description
                },
                {
                  key: 'Ultimo inicio de sesión',
                  value: data.lastSession ? data.lastSession : 'No ha iniciado sesión'
                }
              ]
            }
          ]
        });
        this._viewService.toggleSlideOver()
      }
    )
  }

}