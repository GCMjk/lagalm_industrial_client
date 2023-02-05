import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ErpRoutingModule } from './erp-routing.module';
import { ErpComponent } from './erp.component';

import { SidebarComponent } from '../core/components/sidebar/sidebar.component';
import { NavComponent } from '../core/components/nav/nav.component';
import { TitleComponent } from '../core/components/title/title.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    ErpComponent,
    SidebarComponent,
    NavComponent,
    TitleComponent,
    FooterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    ErpRoutingModule,
    FormsModule
  ]
})
export class ErpModule { }
