import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Vehicle } from './../../models';

@Component({
  selector: 'nb-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent implements OnInit {

  @Input() vehicle: Vehicle;

  @Input() footer: boolean;

  @Output() book: EventEmitter<Vehicle>;

  constructor() {
    this.footer = false;
    this.book = new EventEmitter<Vehicle>();
  }

  ngOnInit() {
  }

  startBooking() {
    this.book.emit(this.vehicle);
  }
}
