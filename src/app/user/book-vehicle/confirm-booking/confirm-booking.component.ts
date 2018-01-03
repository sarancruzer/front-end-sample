import { Component, OnInit, Input } from '@angular/core';

import { BookVehicleFilter, Vehicle } from './../../../models';

@Component({
  selector: 'nb-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  @Input() filter: BookVehicleFilter;

  @Input() vehicle: Vehicle;

  constructor() {
    this.filter = null;
    this.vehicle = null;
  }

  ngOnInit() {
  }

}
