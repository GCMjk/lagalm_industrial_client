import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { routing } from "./app.routing";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TopComponent } from './components/top/top.component';
import { IndexEmployeeComponent } from './components/employee/index-employee/index-employee.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { IndexClientComponent } from './components/client/index-client/index-client.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    TopComponent,
    IndexEmployeeComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    NotFoundComponent,
    CreateClientComponent,
    EditClientComponent,
    IndexClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
