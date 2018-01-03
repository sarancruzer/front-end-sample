import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminFormComponent } from './admin-form/admin-form.component';
import {
  MaterialDashboardProService,
  VehicleTypesService,
  LocationsService,
  VehiclesService,
  BookingsService,
  NotificationService,
  WialonService,
  LeafletService,
  UploadService,
  LangService,
  WindowRefService,
  StatisticsService,
  ChartistService,
} from './services';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import {
  MdpActivatorDirective,
  MdpBootstrapSelectDirective,
  MdpDatetimePickerDirective,
  MdpTagsinputDirective,
  LangDirective,
} from './directives';
import { ChunkPipe } from './pipes/chunk.pipe';
import { LocationPipe } from './pipes/location.pipe';
import { VehicleTypesChooserComponent } from './vehicle-types-chooser/vehicle-types-chooser.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationComponent } from './notification/notification.component';
import { TagsinputComponent } from './tagsinput/tagsinput.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { UploadFilePopupComponent } from './upload-file-popup/upload-file-popup.component';
import { LanguagesComponent } from './languages/languages.component';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { BookingStatePipe } from './pipes/booking-state.pipe';
import { BookingStateComponent } from './booking-state/booking-state.component';
import { MostBookedVehiclesComponent } from './stats/most-booked-vehicles/most-booked-vehicles.component';
import { TimeFramedStatsComponent } from './stats/time-framed-stats/time-framed-stats.component';
import { MostActiveUsersComponent } from './stats/most-active-users/most-active-users.component';
import { BookingsPerDayComponent } from './stats/bookings-per-day/bookings-per-day.component';
import { ChartBasedStatsComponent } from './stats/chart-based-stats/chart-based-stats.component';
import { BookingsStatusOverviewComponent } from './stats/bookings-status-overview/bookings-status-overview.component';
import { SingleValueStatsComponent } from './stats/single-value-stats/single-value-stats.component';

@NgModule({
  declarations: [
    OrganisationFormComponent,
    AdminFormComponent,
    MdpActivatorDirective,
    MdpDatetimePickerDirective,
    MdpBootstrapSelectDirective,
    MdpTagsinputDirective,
    ChunkPipe,
    LocationPipe,
    VehicleTypesChooserComponent,
    VehicleCardComponent,
    LoaderComponent,
    NotificationComponent,
    TagsinputComponent,
    VehicleFormComponent,
    UploadFilePopupComponent,
    LangDirective,
    LanguagesComponent,
    ConfirmPopupComponent,
    BookingStatePipe,
    BookingStateComponent,
    MostBookedVehiclesComponent,
    TimeFramedStatsComponent,
    MostActiveUsersComponent,
    BookingsPerDayComponent,
    ChartBasedStatsComponent,
    BookingsStatusOverviewComponent,
    SingleValueStatsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    WindowRefService,
    MaterialDashboardProService,
    VehicleTypesService,
    LocationsService,
    VehiclesService,
    BookingsService,
    NotificationService,
    WialonService,
    LeafletService,
    LangService,
    StatisticsService,
    ChartistService,
  ],
  exports: [
    OrganisationFormComponent,
    AdminFormComponent,
    MdpActivatorDirective,
    MdpDatetimePickerDirective,
    MdpBootstrapSelectDirective,
    MdpTagsinputDirective,
    ChunkPipe,
    LocationPipe,
    VehicleTypesChooserComponent,
    VehicleCardComponent,
    LoaderComponent,
    NotificationComponent,
    TagsinputComponent,
    VehicleFormComponent,
    UploadFilePopupComponent,
    LangDirective,
    LanguagesComponent,
    ConfirmPopupComponent,
    BookingStatePipe,
    BookingStateComponent,
    MostBookedVehiclesComponent,
    TimeFramedStatsComponent,
    MostActiveUsersComponent,
    BookingsPerDayComponent,
    ChartBasedStatsComponent,
    BookingsStatusOverviewComponent,
    SingleValueStatsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NbSharedModule { }
