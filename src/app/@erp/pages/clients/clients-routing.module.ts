import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':page',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit/edit.module').then(m => m.EditModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
