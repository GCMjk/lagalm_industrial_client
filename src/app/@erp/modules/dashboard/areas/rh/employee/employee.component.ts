import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EmployeeService } from '@erp-core/services/employee.service';
import { ViewService } from '@erp/core/services/common/view.service';
import { SwalService } from '@erp-core/services/swal.service';
import { IEmployee } from '@erp-core/interfaces/rrhh/employee.interface';
import { IResult } from '@erp-core/interfaces/common/result.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public token: string = localStorage.getItem('token')!;
  public employees: Array<IEmployee> = [];
  public employee!: IEmployee;
  public employeesSearch: Array<IEmployee> = [];

  public itemsPerPage: number = 1;
  public total: number = 1;
  public pages: number = 1;
  public page: number = 1;
  public nextPage;
  public prevPage;

  public filter = '';
  public loadStatus = false;
  public loadData = false;
  
  constructor(
    private _route: ActivatedRoute,
    public _viewService: ViewService,
    private _swal: SwalService,
    private _employeeService: EmployeeService
  ) {

    this.nextPage = 1;
    this.prevPage = 1;

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];
      this.page = page;

      if (!page) {
        page = 1;
      } else {
        this.nextPage = page + 1;
        this.prevPage = page - 1;
        if (this.prevPage === 0) {
          this.prevPage = 1;
        }
      }

      this._employeeService.getEmployees(this.token, page).subscribe(
        ({ data, itemsPerPage, total, pages }: IResult) => {
          this.itemsPerPage = itemsPerPage as number;
          this.total = total as number;
          this.pages = pages as number;
          this.employees = data;
          this.employeesSearch = this.employees;
        }
      )

    });
  }

  search() {
    if (this.filter) {
      this.loadData = true;
      const term = new RegExp(this.filter, 'i');
      this.employees = this.employeesSearch.filter(
        (employee: IEmployee) => {
          term.test(employee.fullnames as string) 
          || term.test(employee.job.employeeNumber) 
          || term.test(employee.email) 
          || term.test(employee.job.workArea[0].area)
      });
      this.loadData = false;
    } else {
      this.employees = this.employeesSearch;
    }
  }

  setStatus(id: IEmployee['_id'], status: IEmployee['status']) {
    /* this._employeeService.editStatusEmployee(id, status, this.token).subscribe(
      () => {
        this._employeeService.getEmployee(id, this.token).subscribe(
          ({ data }: IResult) => {
            this._viewService.getView.emit(data)
          }
        )
      }
    ) */
  }

  getEmployee(id: IEmployee['_id']) {
    this._employeeService.getEmployee(id, this.token).subscribe(
      ({ data }: IResult) => {
        this._viewService.getView.emit({
          type: 'Empleado',
          _id: data._id,
          id: data.job.employeeNumber,
          img: data.avatar,
          name: data.fullnames,
          description: data.email,
          btnEdit: ['../edit', data._id],
          btnStatus: {
              action: this.setStatus(data._id, data.status)!,
              status: data.status
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