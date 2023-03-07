import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { NewClientComponent } from './new-client/new-client.component';

const routes: Routes = [
  {
    path: '1',
    component: ClientComponent
  },
  {
    path: 'new',
    component: NewClientComponent
  },
  {
    path: 'edit/:id',
    component: EditClientComponent
  },
  {
    path: '**',
    redirectTo: '1'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
