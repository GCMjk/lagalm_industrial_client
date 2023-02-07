import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpRoutingModule } from './erp-routing.module';
import { ErpComponent } from './erp.component';


@NgModule({
  declarations: [
    ErpComponent
  ],
  imports: [
    CommonModule,
    ErpRoutingModule
  ]
})
export class ErpModule { }
