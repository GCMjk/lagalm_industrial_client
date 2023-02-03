import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

import { IndexEmployeeComponent } from './components/employee/index-employee/index-employee.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from "./components/employee/edit-employee/edit-employee.component";

import { IndexClientComponent } from './components/client/index-client/index-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';

import { LoginComponent } from "./components/login/login.component";

const appRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },

    { path: 'employees/:page', component: IndexEmployeeComponent },
    { path: 'employee/create', component: CreateEmployeeComponent },
    { path: 'employee/:id', component: EditEmployeeComponent },

    { path: 'clients/:page', component: IndexClientComponent },
    { path: 'client/create', component: CreateClientComponent },
    { path: 'client/:id', component: EditClientComponent },

    { path: '', component: LoginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);