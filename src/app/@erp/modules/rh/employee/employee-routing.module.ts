import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: '1',
    component: EmployeeComponent
  },
  {
    path: 'new',
    component: NewEmployeeComponent
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent
  },
  {
    path: '**',
    redirectTo: '1'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
