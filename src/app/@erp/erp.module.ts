import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErpRoutingModule } from './erp-routing.module';
import { ErpComponent } from './erp.component';


@NgModule({
  declarations: [
    ErpComponent
  ],
  imports: [
    CommonModule,
    ErpRoutingModule,
    BrowserAnimationsModule
  ]
})
export class ErpModule { }
