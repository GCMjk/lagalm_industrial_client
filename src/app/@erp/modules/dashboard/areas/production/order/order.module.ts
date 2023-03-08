import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@erp/shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';


@NgModule({
  declarations: [
    OrderComponent,
    NewOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
