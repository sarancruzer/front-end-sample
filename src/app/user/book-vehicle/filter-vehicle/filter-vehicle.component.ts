import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { VehicleType, Location, BookVehicleFilter } from '../../../models';
import {
  VehicleTypesService,
  LocationsService,
  NotificationService,
  LangService
} from '../../../shared';

@Component({
  selector: 'nb-filter-vehicle',
  templateUrl: './filter-vehicle.component.html',
  styleUrls: ['./filter-vehicle.component.css']
})
export class FilterVehicleComponent implements OnInit, AfterViewInit {

  now = new Date();

  filter: BookVehicleFilter;

  locations: Location[];

  @ViewChild(NgForm)
  private form: NgForm;

  @Output() filtered: EventEmitter<BookVehicleFilter>;

  constructor(
    private vehicleTypesService: VehicleTypesService,
    private locationsService: LocationsService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.locations = [];

    this.filter = {
      pickUpTime: new Date(),
      deliveryTime: this.moveTimeAnHourAhead(new Date()),
      location: this.locations.length ? this.locations[0] : null,
      vehicleTypes: <VehicleType[]> []
    };

    this.filtered = new EventEmitter<BookVehicleFilter>();
  }

  ngOnInit() {
  }

  getLocations() {
    this.locations = this.locationsService.locations;
    if (!this.locations || this.locations.length === 0) {
      this.locationsService.list()
        .subscribe(
          data => {
            this.locations = data;
          },
          error => {
            let err = this.lang.get('err_locations_fetch');
            err += '<hr />' + JSON.stringify(error);
            this.notificationService.notifyError(err, true);
          }
        )
      ;
    }
  }

  ngAfterViewInit() {
    this.getLocations();
  }

  doSubmit() {
    if (!this.form) {
      return;
    }

    this.form.ngSubmit.emit();
  }

  onSubmit() {
    if (!this.filter.location) {
      const msg = this.lang.get('err_select_location');
      return this.notificationService.notifyError(msg);
    }

    this.filtered.emit(this.filter);
  }

  onVehicleTypesChosen(types: VehicleType[]) {
    this.filter.vehicleTypes = types;
  }

  onPickUpTimeChange(time: Date) {
    this.filter.pickUpTime = new Date(time);

    // put the delivery time one hour ahead
    this.filter.deliveryTime = this.moveTimeAnHourAhead(time);
  }

  onDeliveryTimeChange(time: Date) {
    this.filter.deliveryTime = new Date(time);
    this.form.control.updateValueAndValidity();
  }

  private moveTimeAnHourAhead(time: Date) {
    time.setHours(time.getHours() + 1);

    return new Date(time);
  }
}
