import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@erp/shared/shared.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    NewProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
