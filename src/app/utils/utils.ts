import * as moment from 'moment';

import { Booking, BookingState } from './../models';

export default class Utils {

  static parseDate(stringDate: string): Date {
    const m = moment.utc(stringDate, 'DD-MM-YYYY HH:mm:ss');

    return m.toDate();
  }

  static formatDateUsingUTC(date: Date, format?: string): string {
    const utcDate = moment(date).utc();
    return utcDate.format(format ? format : 'DD-MM-YYYY HH:mm:ss');
  }

  static parseBookingState(state: string): BookingState {
    switch (state.toUpperCase()) {
      case 'DRAFT':
        return BookingState.Draft;
      case 'ACTIVE':
        return BookingState.Active;
      case 'CANCELLED':
        return BookingState.Cancelled;
      case 'COMPLETED':
        return BookingState.Completed;
      default:
        return BookingState.Unknown;
    }
  }

  static resolveBookingState(booking: Booking): Booking {
    // return, if booking state is not active
    if (booking.state !== BookingState.Active) {
      return booking;
    }

    const now = new Date();
    if (booking.endTime.getTime() < now.getTime()) {
      booking.state = BookingState.Completed;
    }

    return booking;
  }

  static resolveEventClassName(booking: Booking): string {
    switch (booking.state) {
      case BookingState.Active:
        return 'event-azure';
      case BookingState.Completed:
        return 'event-green';
      default:
        return 'event-red';
    }
  }
}
