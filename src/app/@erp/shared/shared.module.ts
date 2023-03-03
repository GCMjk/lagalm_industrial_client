import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SideBarComponent } from '@erp-shared/side-bar/side-bar.component';
import { NavigationComponent } from '@erp-shared/navigation/navigation.component';
import { HeaderComponent } from '@erp-shared/header/header.component';
import { NotFoundComponent } from '@erp-shared/not-found/not-found.component';

@NgModule({
  declarations: [
    SideBarComponent,
    NavigationComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SideBarComponent,
    NavigationComponent,
    HeaderComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
