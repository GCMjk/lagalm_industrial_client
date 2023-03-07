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
        path: 'products',
        loadChildren: () => import('@erp-areas/sales/products/products.module').then(m => m.ProductsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
