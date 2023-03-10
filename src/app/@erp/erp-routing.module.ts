import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErpComponent } from './erp.component';
import { AuthGuard } from '@erp/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'app',
    component: ErpComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('@erp-modules/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: '',
        loadChildren: () => import('@erp-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [ AuthGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpRoutingModule { }
