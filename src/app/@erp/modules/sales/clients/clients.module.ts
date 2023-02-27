import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@erp/shared/shared.module';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';

@NgModule({
  declarations: [
    ClientsPageComponent,
    EditClientComponent,
    CreateClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
