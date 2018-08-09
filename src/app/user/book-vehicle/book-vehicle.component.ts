import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  BookingsService,
  VehiclesService,
  SessionService,
  NotificationService,
  LangService,
} from './../../shared/services';
import { BookVehicleStep } from './book-vehicle-step';
import { BookVehicleWizardService } from './services/book-vehicle-wizard.service';
import { FilterVehicleComponent } from './filter-vehicle/filter-vehicle.component';
import {
  Booking,
  BookingState,
  Vehicle,
  BookVehicleFilter,
} from './../../models';
import { BookVehicleStepButtonKind } from './book-vehicle-step-button-kind.enum';

@Component({
  selector: 'nb-book-vehicle',
  templateUrl: './book-vehicle.component.html',
  styleUrls: ['./book-vehicle.component.css']
})
export class BookVehicleComponent implements OnInit, AfterViewInit {

  isBusy: boolean;

  filter: BookVehicleFilter;

  bookableVehicles: Vehicle[];

  vehicle: Vehicle;

  steps: BookVehicleStep[];

  @ViewChild(FilterVehicleComponent) filterVehicleComponent: FilterVehicleComponent;

  private booking: Booking;

  constructor(
    public wizard: BookVehicleWizardService,
    private vehiclesService: VehiclesService,
    private bookingService: BookingsService,
    private sessionSession: SessionService,
    private notificationService: NotificationService,
    private router: Router,
    private lang: LangService
  ) {
    this.filter = {
      pickUpTime: new Date(),
      deliveryTime: new Date(),
      location: null,
      vehicleTypes: []
    };

    this.steps = wizard.getSteps();

    this.bookableVehicles = [];

    this.isBusy = false;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.steps.map(step => {
        switch (step.id) {
          case BookVehicleWizardService.STEP_FILTER:
            step.name = this.lang.get('bv_filter');
            this.i18nStepButtons(step);
            break;

          case BookVehicleWizardService.STEP_SELECT:
            step.name = this.lang.get('bv_select');
            this.i18nStepButtons(step);
            break;

          case BookVehicleWizardService.STEP_CONFIRM:
            step.name = this.lang.get('bv_confirm');
            this.i18nStepButtons(step);
            step.buttons.map(btn => {
              if (btn.kind === BookVehicleStepButtonKind.Next) {
                btn.label = this.lang.get('bv_btn_confirm');
              }
            });
            break;
        }
      });
    });
  }

  moveForward() {
    // in case of the filter step, trigger the doSubmit() method of the
    // FilterVehicleComponent that will in turn call our onFilterVehilce() method
    if (this.wizard.getActiveStep().id === BookVehicleWizardService.STEP_FILTER) {
      if (!this.filterVehicleComponent) {
        return console.error('FilterVehicleComponent is undefined!');
      }

      return this.filterVehicleComponent.doSubmit();
    }

    // in case of the confirm step (last step), we try to confirm the booking
    if (this.wizard.getActiveStep().id === BookVehicleWizardService.STEP_CONFIRM) {
      this.doConfirmBooking();
    }
  }

  moveBackward() {
    // cancell the booking if we have a drafted booking when moving to filter step
    if (this.wizard.getActiveStep().id === BookVehicleWizardService.STEP_SELECT && this.booking) {
      return this.cancelDraftedBookingAndMoveBackward();
    }

    this.wizard.moveBackward();
  }

  /**
   * The implementation of this method can be outlined as:
   *
   * 1. request backend for a list of vehicles based on the filter
   * 2. if a none empty list is returned initials the property and move the wizard forward
   * 3. if an empty list is returned notify the user accordingly and stay on the step
   */
  onFilterVehicle(filter: BookVehicleFilter) {
    this.isBusy = true;
    this.filter = filter;
    this.vehiclesService.findBookable(this.filter)
      .subscribe(
        vehicles => {
          this.isBusy = false;
          if (!vehicles.length) {
            this.notificationService.notifyInfo(this.lang.get('msg_no_match'));
            return;
          }
          this.bookableVehicles = vehicles;
          this.wizard.moveForward();
        },
        err => {
          this.isBusy = false;
          this.wizard.moveForward();
          this.notificationService.notifyError(this.lang.get('err_no_bookable_vehicles'));
        }
      )
    ;
  }

  /**
   * The implementation of this method can be outlined as:
   *
   * 1. request backend for a draft of a booking based on the selected vehicle and filter
   * 2. if the request is successfull move the wizard forward
   * 3. if the reqeust is a failure notify the user accordingly and stay at the step
   */
  onVehicleSelected(vehicle: Vehicle) {
    this.isBusy = true;
    this.vehicle = vehicle;

    this.booking = {
      startTime: this.filter.pickUpTime,
      endTime: this.filter.deliveryTime,
      vehicle: this.vehicle,
      state: BookingState.Draft,
      owner: this.sessionSession.getUser()
    };
    this.bookingService.draft(this.booking)
      .subscribe(
        draft => {
          this.isBusy = false;
          this.booking.key = draft.booking_key;
          this.wizard.moveForward();
        },
        error => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_failed_drafting_booking'));
        }
      )
    ;
  }

  /**
   * The implementtaion of this method can be outlined as:
   *
   * 1. request backend for confirmation of the drafted booking
   * 2. if the request is succesffull reset the wizard
   *    and navigate the user to the "My Bookings" view
   * 3. if the request is failure, notify the user accordingly and stay at the step
   */
  doConfirmBooking() {
    this.isBusy = true;
    this.bookingService.confirm(this.booking)
      .subscribe(
        confirmed => {
          this.isBusy = false;
          this.wizard.reset();
          this.router.navigate(['/me/bookings']);
        },
        error => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_failed_confirming_booking'));
        }
      )
    ;
  }

  protected cancelDraftedBookingAndMoveBackward() {
    this.isBusy = true;
    this.bookingService.cancel(this.booking)
      .subscribe(
        () => {
          this.isBusy = false;
          this.wizard.moveBackward();
        },
        error => {
          this.isBusy = false;
          this.notificationService.notifyWarning(this.lang.get('err_failed_cancelling_booking'));
          this.wizard.moveBackward();
        }
      )
    ;
  }

  private i18nStepButtons(step: BookVehicleStep) {
    step.buttons.forEach(button => {
      switch (button.kind) {
        case BookVehicleStepButtonKind.Next:
          button.label = this.lang.get('bv_btn_next');
          break;

        case BookVehicleStepButtonKind.Prev:
          button.label = this.lang.get('bv_btn_prev');
          break;
      }
    });
  }
}
