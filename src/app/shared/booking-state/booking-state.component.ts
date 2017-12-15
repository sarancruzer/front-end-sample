import { Component, OnInit, Input } from '@angular/core';

import { Booking, BookingState } from './../../models';

@Component({
  selector: 'nb-booking-state',
  templateUrl: './booking-state.component.html',
  styleUrls: ['./booking-state.component.css']
})
export class BookingStateComponent implements OnInit {

  @Input() booking: Booking;

  constructor() { }

  ngOnInit() {
  }

  isActive(): boolean {
    return this.booking.state === BookingState.Active;
  }

  isCancelled(): boolean {
    return this.booking.state === BookingState.Cancelled;
  }

  isCompleted(): boolean {
    return this.booking.state === BookingState.Completed;
  }

}
