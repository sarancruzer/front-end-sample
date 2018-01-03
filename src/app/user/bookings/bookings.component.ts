import { Component, OnInit, OnChanges } from '@angular/core';

import {
  Booking,
  User,
  BookingState
} from '../../models';
import {
  SessionService,
  UsersService,
  BookingsService,
  NotificationService,
  LangService,
} from '../../shared/services';

@Component({
  selector: 'nb-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnChanges {

  bookings: any;

  isBusy: boolean;

  private user: User;

  constructor(
    private sessionService: SessionService,
    private usersService: UsersService,
    private bookingService: BookingsService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.bookings = {
      scheduled: [],
      history: []
    };

    this.isBusy = false;
  }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.getBookings();
  }

  ngOnChanges() {
    if (this.bookings.scheduled.length < 1 && this.bookings.history.length < 1) {
      this.bookings = this.usersService.bookings;
    }
  }

  getBookings() {
    this.isBusy = true;
    this.usersService.listBookings(this.user).subscribe(
      data => {
        this.isBusy = false;
        this.bookings.scheduled = data.scheduled;
        this.bookings.history = data.history;
      },
      err => {
        this.isBusy = false;
        this.notificationService.notifyError(this.lang.get('err_failed_fetching_bookings'));
      }
    );
  }

  cancelBooking(booking: Booking, index: number) {
    this.isBusy = true;
    this.bookingService.cancel(booking).subscribe(
      data => {
        this.isBusy = false;
        booking.state = <BookingState>BookingState.Cancelled;

        // remove the booking from scheduled bookings list
        this.bookings.scheduled.splice(index, 1);

        // apend the booking to the history bookings list
        this.bookings.history.push(booking);

        // modify bookings list exists in users service
        this.usersService.bookings = this.bookings;
      },
      err => {
        this.isBusy = false;
        this.notificationService.notifyError(this.lang.get('err_failed_cancelling_booking'));
      }
    );
  }

}
