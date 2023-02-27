import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SideBarComponent } from '@erp-shared/side-bar/side-bar.component';
import { NavigationComponent } from '@erp-shared/navigation/navigation.component';
import { HeaderComponent } from '@erp-shared/header/header.component';
import { FooterComponent } from '@erp-shared/footer/footer.component';
import { NotFoundComponent } from '@erp-shared/not-found/not-found.component';
import { UiInputComponent } from './components/form/ui-input/ui-input.component';

@NgModule({
  declarations: [
    SideBarComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    UiInputComponent
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
    FooterComponent,
    NotFoundComponent,
    UiInputComponent
  ]
})
export class SharedModule { }
