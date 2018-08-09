import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageLocalAdminComponent } from './manage-local-admin/manage-local-admin.component';
import { AddLocalAdminComponent } from './add-local-admin/add-local-admin.component';
import { EditLocalAdminComponent } from './edit-local-admin/edit-local-admin.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ManageLocalAdminComponent, AddLocalAdminComponent, EditLocalAdminComponent]
})
export class LocalAdminModule { }
