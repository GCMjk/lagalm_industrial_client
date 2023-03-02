import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'rh',
        loadChildren: () => import('@erp-areas/rh/rh.module').then(m => m.RhModule) 
      },
      {
        path: 'sales',
        loadChildren: () => import('@erp-areas/sales/sales.module').then(m => m.SalesModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
