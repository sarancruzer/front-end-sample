import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Vehicle, BookVehicleFilter } from './../../../models';

@Component({
  selector: 'nb-select-vehicle',
  templateUrl: './select-vehicle.component.html',
  styleUrls: ['./select-vehicle.component.css']
})
export class SelectVehicleComponent implements OnInit {

  @Input() filter: BookVehicleFilter;

  @Input() vehicles: Vehicle[];

  @Output() select: EventEmitter<Vehicle>;

  constructor() {
    this.vehicles = [];
    this.select = new EventEmitter<Vehicle>();
  }

  ngOnInit() {
  }

  doBook(vehicle: Vehicle) {
    this.select.emit(vehicle);
  }

}
