import { Pipe, PipeTransform } from '@angular/core';

import { BookingState, Booking } from '../../models';
import { LangService } from './../services/lang.service';

@Pipe({
  name: 'bookingState'
})
export class BookingStatePipe implements PipeTransform {

  constructor (private lang: LangService) {}

  transform(value: any, args?: any): any {
    switch (value) {
      case BookingState.Draft:
        return this.lang.get('booking_state_draft');
      case BookingState.Active:
        return this.lang.get('booking_state_active');
      case BookingState.Cancelled:
        return this.lang.get('booking_state_cancelled');
      case BookingState.Completed:
        return this.lang.get('booking_state_completed');
      default:
        return this.lang.get('booking_state_unknown');
    }
  }
}
