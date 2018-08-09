import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { UserComponent } from './user.component';
import { AdminGuardService, UserGuardService } from './services';

import { NbSharedModule } from '../shared/nb-shared.module';
import { UserRoutingModule } from './user-routing.module';

import { BookVehicleComponent } from './book-vehicle/book-vehicle.component';
import { FilterVehicleComponent } from './book-vehicle/filter-vehicle/filter-vehicle.component';
import { SelectVehicleComponent } from './book-vehicle/select-vehicle/select-vehicle.component';
import { ConfirmBookingComponent } from './book-vehicle/confirm-booking/confirm-booking.component';
import { SettingsComponent } from './settings/settings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './admin/users/users.component';
import { VehiclesComponent } from './admin/vehicles/vehicles.component';
import { OrganisationComponent } from './admin/organisation/organisation.component';
import { DepartmentsComponent } from './admin/organisation/departments/departments.component';
import { LocationsComponent } from './admin/organisation/locations/locations.component';
import { BookingsComponent as AdminBookingsComponent } from './admin/bookings/bookings.component';
import { WialonIntegrationComponent } from './admin/wialon-integration/wialon-integration.component';
import { UserEditorComponent } from './admin/users/user-editor/user-editor.component';

import { BookVehicleWizardService } from './book-vehicle/services/book-vehicle-wizard.service';
import { UsersService, DepartmentsService, UploadService } from '../shared/services';
import { UserFormComponent } from './settings/user-form/user-form.component';
import { SelectDepartmentComponent } from './settings/user-form/select-department/select-department.component';
import { ChangePasswordFormComponent } from './settings/change-password-form/change-password-form.component';
import { VehicleEditorComponent } from './admin/vehicles/vehicle-editor/vehicle-editor.component';
import { WialonMapComponent } from './admin/wialon-integration/wialon-map/wialon-map.component';
import { WialonIntegratorComponent } from './admin/wialon-integration/wialon-integrator/wialon-integrator.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageOrganisationComponent } from './manage-organisation/manage-organisation/manage-organisation.component';
import { EditOrganisationComponent } from './manage-organisation/edit-organisation/edit-organisation.component';
import { AddOrganisationComponent } from './manage-organisation/add-organisation/add-organisation.component';
import { WialonOrganisationComponent } from './manage-organisation/wialon-organisation/wialon-organisation.component';
import { WialonInitOrganisationComponent } from './manage-organisation/wialon-init-organisation/wialon-init-organisation.component';
import { OrganisationWialonIntegratorComponent } from './manage-organisation/organisation-wialon-integrator/organisation-wialon-integrator.component';
import { OrganisationWialonMapComponent } from './manage-organisation/organisation-wialon-map/organisation-wialon-map.component';
import { AddUserComponent } from './admin/users/add-user/add-user.component';
import { EditUserComponent } from './admin/users/edit-user/edit-user.component';
import { ManageUserComponent } from './admin/users/manage-user/manage-user.component';
import { ManageVehicleComponent } from './admin/vehicles/manage-vehicle/manage-vehicle.component';
import { AddVehicleComponent } from './admin/vehicles/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './admin/vehicles/edit-vehicle/edit-vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NbSharedModule,
    MomentModule,
  ],
  declarations: [
    UserComponent,
    BookVehicleComponent,
    FilterVehicleComponent,
    SelectVehicleComponent,
    ConfirmBookingComponent,
    SettingsComponent,
    CalendarComponent,
    BookingsComponent,
    UsersComponent,
    VehiclesComponent,
    OrganisationComponent,
    DepartmentsComponent,
    LocationsComponent,
    AdminBookingsComponent,
    WialonIntegrationComponent,
    UserEditorComponent,
    UserFormComponent,
    SelectDepartmentComponent,
    ChangePasswordFormComponent,
    VehicleEditorComponent,
    WialonMapComponent,
    WialonIntegratorComponent,
    DashboardComponent,
    ManageOrganisationComponent,
    AddOrganisationComponent,
    EditOrganisationComponent,
    WialonOrganisationComponent,
    WialonInitOrganisationComponent,
    OrganisationWialonIntegratorComponent,
    OrganisationWialonMapComponent,
    AddUserComponent,
    EditUserComponent,
    ManageUserComponent,
    ManageVehicleComponent,
    AddVehicleComponent,
    EditVehicleComponent
  ],
  providers: [
    BookVehicleWizardService,
    DepartmentsService,
    UsersService,
    UploadService,
    AdminGuardService,
    UserGuardService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserModule { }
