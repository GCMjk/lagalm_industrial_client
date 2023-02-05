import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { IndexClientComponent } from './components/client/index-client/index-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';

import { LoginComponent } from "./components/login/login.component";

const appRoutes: Routes = [

    { path: 'clients/:page', component: IndexClientComponent },
    { path: 'client/create', component: CreateClientComponent },
    { path: 'client/:id', component: EditClientComponent },

    { path: '', component: LoginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);