import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@erp-shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';


@NgModule({
  declarations: [
    ProductsPageComponent,
    EditProductComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
