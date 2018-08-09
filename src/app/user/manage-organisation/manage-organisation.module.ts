import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrganisationComponent } from './add-organisation/add-organisation.component';
import { EditOrganisationComponent } from './edit-organisation/edit-organisation.component';
import { ManageOrganisationComponent } from './manage-organisation/manage-organisation.component';
import { WialonOrganisationComponent } from './wialon-organisation/wialon-organisation.component';
import { WialonInitOrganisationComponent } from './wialon-init-organisation/wialon-init-organisation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddOrganisationComponent, EditOrganisationComponent, ManageOrganisationComponent, WialonOrganisationComponent, WialonInitOrganisationComponent]
})
export class ManageOrganisationModule { }
