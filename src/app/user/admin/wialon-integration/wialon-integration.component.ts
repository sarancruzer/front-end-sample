import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  Booking,
  Organisation,
  Vehicle
} from './../../../models';
import {
  NotificationService,
  BookingsService,
  SessionService,
  WialonService,
  VehiclesService,
  VehicleTypesService,
  LangService,
} from './../../../shared/services';

@Component({
  selector: 'nb-wialon-integration',
  templateUrl: './wialon-integration.component.html',
  styleUrls: ['./wialon-integration.component.css']
})
export class WialonIntegrationComponent implements OnInit, OnDestroy {

  organisation: Organisation;

  isIntegrated: Boolean;

  bookings: Booking[];

  isFetchingBookings: Boolean;

  constructor(
    private notificationService: NotificationService,
    private bookingService: BookingsService,
    private sessionService: SessionService,
    private wialonService: WialonService,
    private vehicleService: VehiclesService,
    private vehicleTypesService: VehicleTypesService,
    private lang: LangService
  ) {
    this.isIntegrated = false;
    this.bookings = [];
    this.isFetchingBookings = false;
  }

  ngOnInit() {
    this.organisation = this.sessionService.getOrganisation();

    if (this.organisation) {
      this.isIntegrated = this.organisation.wialon_token != null;
    }

    
    console.log('this.isIntegrated');

    console.log(this.isIntegrated);

    if (!this.isIntegrated) {
      return;
    }

    

  //  this.fetchActiveBookings();
  }


  ngOnDestroy() {
    this.wialonService.logout();
  }

  onIntegrated() {
    this.isIntegrated = true;
    this.organisation = this.sessionService.getOrganisation();
    this.sessionService.setOrganisation(this.organisation );
    this.importVehiclesFromWialon();
  }

  private importVehiclesFromWialon() {
    if (!this.wialonService.isLoggedIn()) {
      // We delay the import for 5 seconds recusively until
      // we are logged in
      return setTimeout(() => {
        this.importVehiclesFromWialon();
      }, 5000);
    }

    // fetch units (vehicles) from Wialon
    this.wialonService.fetchUnits()
      .then(units => {
        units.forEach(unit => {
          let vehicle: Vehicle = {
            isAvailable: true,
            vehicleId: unit.getName(),
            trackerId: unit.getId(),
            type: this.vehicleTypesService.getByKey('OTHER')
          };

          this.vehicleService.create(vehicle).subscribe(
            response => {
              this.notificationService.notifySuccess(response);
            },
            error => {
              this.notificationService.notifyError(error);
            }
          );
        });
      })
      .catch(error => {
        let msg = this.lang.get('err_wialon_units_import');
        msg = msg ? msg.replace('{err_msg}', error) : '';
        this.notificationService.notifyError(msg);
      })
    ;
  }

  private fetchActiveBookings() {
    this.isFetchingBookings = true;
    this.bookingService.fetchActive().subscribe(
      bookings => {
        this.isFetchingBookings = false;
        this.bookings = bookings;
      },
      error => {
        this.isFetchingBookings = false;
        const msg = this.lang.get('err_fetching_booked_vehicles');
        this.notificationService.notifyError(msg);
      }
    );
  }

}
