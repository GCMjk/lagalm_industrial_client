import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public token = localStorage.getItem('token');
  public employees: Array<any> = [];
  public employeesSearch: Array<any> = [];

  public itemsPerPage = 1;
  public total = 1;
  public pages = 1;
  public page = 1;
  public nextPage;
  public prevPage;

  public filter = '';
  public loadStatus = false;
  public loadData = false;

  constructor(
    private _employeeService: EmployeeService,
    private _route: ActivatedRoute
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
        response => {
          this.itemsPerPage = response.itemsPerPage;
          this.total = response.total;
          this.pages = response.pages;
          this.employees = response.employees;
          this.employeesSearch = this.employees;
        }
      )

    });
  }

  search() {
    if (this.filter) {
      this.loadData = true;
      const term = new RegExp(this.filter, 'i');
      this.employees = this.employeesSearch.filter(employee => term.test(employee.fullnames) || term.test(employee.job.employeeNumber) || term.test(employee.email) || term.test(employee.job.workAreaId));
      this.loadData = false;
    } else {
      this.employees = this.employeesSearch;
    }
  }

  setStatus(id: any, status: any) {
    this.loadStatus = true;
    this._employeeService.editStatusEmployee(id, { status }, this.token).subscribe(
      response => {
        this.loadStatus = false;
        $('#delete-' + id).modal('hide');
        this.getEmployees();
      }
    );
  }

}
