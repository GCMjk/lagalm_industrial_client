import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SideBarComponent } from '@erp-shared/side-bar/side-bar.component';
import { NavigationComponent } from '@erp-shared/navigation/navigation.component';
import { HeaderComponent } from '@erp-shared/header/header.component';
import { FooterComponent } from '@erp-shared/footer/footer.component';
import { NotFoundComponent } from '@erp-shared/not-found/not-found.component';

@NgModule({
  declarations: [
    SideBarComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideBarComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
