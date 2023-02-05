import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { routing } from "./app.routing";
import { LoginComponent } from './components/login/login.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { IndexClientComponent } from './components/client/index-client/index-client.component';

import { ErpModule } from './@erp/pages/erp.module';
import { PublicModule } from './@public/pages/public.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateClientComponent,
    EditClientComponent,
    IndexClientComponent
  ],
  imports: [
    BrowserModule,
    ErpModule,
    PublicModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
