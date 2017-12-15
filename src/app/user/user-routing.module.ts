import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuardService, UserGuardService } from './services';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsComponent as AdminBookingsComponent } from './admin/bookings/bookings.component';
import { BookVehicleComponent } from './book-vehicle/book-vehicle.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrganisationComponent } from './admin/organisation/organisation.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user.component';
import { UsersComponent } from './admin/users/users.component';
import { VehiclesComponent } from './admin/vehicles/vehicles.component';
import { WialonIntegrationComponent } from './admin/wialon-integration/wialon-integration.component';

const userRoutes: Routes = [
  {
    path: 'me',
    component: UserComponent,
    canActivate: [UserGuardService],
    children: [
      {
        path: 'book-vehicle',
        component: BookVehicleComponent,
        data: {
          title: 'Book Vehicle'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Settings'
        }
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        data: {
          title: 'Calendar'
        }
      },
      {
        path: 'bookings',
        component: BookingsComponent,
        data: {
          title: 'My Bookings'
        }
      },
      {
        path: 'admin',
        canActivate: [UserGuardService, AdminGuardService],
        canActivateChild: [UserGuardService, AdminGuardService],
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: {
              title: 'Dashboard'
            }
          },
          {
            path: 'users',
            component: UsersComponent,
            data: {
              title: 'Manage Users'
            }
          },
          {
            path: 'vehicles',
            component: VehiclesComponent,
            data: {
              title: 'Manage Vehicles'
            }
          },
          {
            path: 'organisation',
            component: OrganisationComponent,
            data: {
              title: 'Organisation'
            }
          },
          {
            path: 'bookings',
            component: AdminBookingsComponent,
            data: {
              title: 'Manage Bookings'
            }
          },
          {
            path: 'wialon-integration',
            component: WialonIntegrationComponent,
            data: {
              title: 'Worldtrack Integration'
            }
          }
        ]
      },
    ],
    data: {
      title: 'WorldTrack Booking'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
