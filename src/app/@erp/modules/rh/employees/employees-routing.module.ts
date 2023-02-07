import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateEmployeePageComponent } from './pages/create-employee-page/create-employee-page.component';
import { EditEmployeePageComponent } from './pages/edit-employee-page/edit-employee-page.component';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';

const routes: Routes = [
  {
    path: ':page',
    component: EmployeesPageComponent
  },
  {
    path: 'new/create',
    component: CreateEmployeePageComponent
  },
  {
    path: 'edit/:id',
    component: EditEmployeePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
