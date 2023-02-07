import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@erp-shared/shared.module';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { CreateEmployeePageComponent } from './pages/create-employee-page/create-employee-page.component';
import { EditEmployeePageComponent } from './pages/edit-employee-page/edit-employee-page.component';


@NgModule({
  declarations: [
    EmployeesPageComponent,
    CreateEmployeePageComponent,
    EditEmployeePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
