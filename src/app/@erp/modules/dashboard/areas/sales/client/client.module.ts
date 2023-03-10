import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@erp/shared/shared.module';

import { ClientRoutingModule } from './client-routing.module';

import { ClientComponent } from './client.component';
import { NewClientComponent } from './new-client/new-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

// import { DisableControlDirective } from '@erp-core/directives/disabled-if.directive';

@NgModule({
  declarations: [
    ClientComponent,
    NewClientComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    //DisableControlDirective,
    ReactiveFormsModule,
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
