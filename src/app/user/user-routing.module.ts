import { EditVehicleComponent } from './admin/vehicles/edit-vehicle/edit-vehicle.component';
import { AddVehicleComponent } from './admin/vehicles/add-vehicle/add-vehicle.component';
import { AddUserComponent } from './admin/users/add-user/add-user.component';
import { EditLocalAdminComponent } from './local-admin/edit-local-admin/edit-local-admin.component';
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
import { LocalAdminModule } from './local-admin/local-admin.module';
import { ManageLocalAdminComponent } from './local-admin/manage-local-admin/manage-local-admin.component';
import { AddLocalAdminComponent } from './local-admin/add-local-admin/add-local-admin.component';
import { ManageOrganisationComponent } from './manage-organisation/manage-organisation/manage-organisation.component';
import { AddOrganisationComponent } from './manage-organisation/add-organisation/add-organisation.component';
import { ManageUserComponent } from './admin/users/manage-user/manage-user.component';
import { EditUserComponent } from './admin/users/edit-user/edit-user.component';
import { ManageVehicleComponent } from './admin/vehicles/manage-vehicle/manage-vehicle.component';

const userRoutes: Routes = [
  {
    path: 'superAdmin',
    component: UserComponent,
    canActivate: [UserGuardService],
    children: [
      {
        path: 'book-vehicle',
        component: BookVehicleComponent,
        data: {
          title: 'Book Vehicle'
        }
      }
    ]
  },
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
        path: 'manage-organisation',
        component: ManageOrganisationComponent,
        data: {
          title: 'Organisation List'
        }
      },
      {
        path: 'add-organisation',
        component: AddOrganisationComponent,
        data: {
          title: 'Organisation Create'
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
          },
          {
            path: 'manage-local-admin',
            component: ManageLocalAdminComponent,
            data: {
              title: 'Manage Local Admin'
            }
          },
          {
            path: 'add-local-admin',
            component: AddLocalAdminComponent,
            data: {
              title: 'Create Local Admin'
            }
          },
          {
            path: 'edit-local-admin/:id',
            component: EditLocalAdminComponent,
            data: {
              title: 'Edit Local Admin'
            }
          },
          {
            path: 'manage-user',
            component: ManageUserComponent,
            data: {
              title: 'Manage Users'
            }
          },
          {
            path: 'add-user',
            component: AddUserComponent,
            data: {
              title: 'Add User'
            }
          },
          {
            path: 'edit-user/:id',
            component: EditUserComponent,
            data: {
              title: 'Edit User'
            }
          },
            {
              path: 'manage-vehicle',
              component: ManageVehicleComponent,
              data: {
                title: 'Manage Vehicles'
              }
            },
            {
              path: 'add-vehicle',
              component: AddVehicleComponent,
              data: {
                title: 'Add Vehicle'
              }
            },
            {
              path: 'edit-vehicle/:id',
              component: EditVehicleComponent,
              data: {
                title: 'Edit Vehicle'
              }
          },
        ]
      },
    ],
    data: {
      title: 'WorldTrack Booking'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(userRoutes),LocalAdminModule],
  exports: [RouterModule]
})
export class UserRoutingModule { }
