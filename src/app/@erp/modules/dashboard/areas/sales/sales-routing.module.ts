import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'client',
        loadChildren: () => import('@erp-areas/sales/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'product',
        loadChildren: () => import('@erp-areas/sales/product/product.module').then(m => m.ProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
