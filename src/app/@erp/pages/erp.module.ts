import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpRoutingModule } from './erp-routing.module';
import { ErpComponent } from './erp.component';

import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { NavComponent } from '../core/components/nav/nav.component';
import { TitleComponent } from '../core/components/title/title.component';
import { FooterComponent } from '../core/components/footer/footer.component';

@NgModule({
  declarations: [
    ErpComponent,
    SidebarComponent,
    NavComponent,
    TitleComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ErpRoutingModule
  ]
})
export class ErpModule { }
