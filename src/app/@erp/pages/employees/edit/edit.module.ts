import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { NotFoundComponent } from '../../../core/components/not-found/not-found.component';

@NgModule({
  declarations: [
    EditComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    FormsModule
  ]
})
export class EditModule { }
