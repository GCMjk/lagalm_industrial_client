import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '1',
    component: ProductComponent
  },
  {
    path: 'new',
    component: NewProductComponent
  },
  {
    path: 'edit/:id',
    component: EditProductComponent
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
export class ProductRoutingModule { }
