import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { EmployeeService } from '@erp-core/services/employee.service';
import { SwalService } from '@erp-core/services/swal.service';
import { IEmployee } from '@erp-core/interfaces/rrhh/employee.interface';
import { IResult } from '@erp-core/interfaces/common/result.interface';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [ 
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({  opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
})
export class EmployeeComponent implements OnInit {

  isMenu = false;
  public token: string = localStorage.getItem('token')!;
  public employees: Array<IEmployee> = [];
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
    private _employeeService: EmployeeService,
    private _swal: SwalService,
    private _route: ActivatedRoute
  ) {

    this.nextPage = 1;
    this.prevPage = 1;

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  toggleMenu(){
    this.isMenu = !this.isMenu;
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
    console.log(status)
    this.loadStatus = true;
    this._employeeService.editStatusEmployee(id, status, this.token).subscribe(
      ({ message }: IResult) => {
        this.loadStatus = false;
        $('#delete-' + id).modal('hide');
        this.getEmployees();
        this._swal.toast({ text: message, icon: 'success' })
      },
      ({ error: { message } }) => {
        this._swal.toast({ text: message, icon: 'error' })
      }
    );
  }

}
