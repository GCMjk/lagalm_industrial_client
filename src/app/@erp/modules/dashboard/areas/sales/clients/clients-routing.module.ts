import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';

const routes: Routes = [
  {
    path: ':page',
    component: ClientsPageComponent
  },
  {
    path: 'new/create',
    component: CreateClientComponent
  },
  {
    path: 'edit/:id',
    component: EditClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
