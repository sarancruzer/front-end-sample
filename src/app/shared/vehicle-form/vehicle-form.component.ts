import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Vehicle, Location, VehicleType } from '../../models';
import {
  LocationsService,
  VehicleTypesService,
  MaterialDashboardProService,
} from '../../shared/services';

@Component({
  selector: 'nb-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  @Input() vehicle: Vehicle;

  @Input() buttonText: string;

  @Output() done: EventEmitter<any> = new EventEmitter();

  locations: Location[];

  vehicleTypes: VehicleType[];

  vehicleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private locationsService: LocationsService,
    private vehicleTypesService: VehicleTypesService,
    private mdpService: MaterialDashboardProService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.vehicleTypes = this.vehicleTypesService.getAll();
    this.getLocations();
    this.mdpService.initMdp();
  }

  buildForm(): void {
    this.vehicleForm = this.formBuilder.group({
      'manufacturer': [this.vehicle.manufacturer, []
      ],
      'model': [this.vehicle.model, []
      ],
      'trackerId': [this.vehicle.trackerId, []
      ],
      'vehicleId': [this.vehicle.vehicleId, [
          Validators.required
        ]
      ],
      'isAvailable': [this.vehicle.isAvailable, []
      ],
      'type': [this.vehicle.type, [
          Validators.required
        ]
      ],
      'location': [this.vehicle.location, [
          Validators.required
        ]
      ]
    });
  }

  getLocations() {
    this.locations = this.locationsService.locations;
    if (!this.locations || this.locations.length === 0) {
      this.locationsService.list()
        .subscribe(
          data => {
            this.locations = data;
          },
          error => { }
        );
    }
  }

  onSubmit() {
    const vehicle: Vehicle = this.vehicleForm.value;
    vehicle.key = this.vehicle.key;
    vehicle.location = this.normalizeLocation(vehicle.location);
    this.done.emit(vehicle);
  }

  protected normalizeLocation(location: Location|string): Location {
    if (typeof location !== 'string') {
      return location;
    }

    for (let i = 0; i < this.locations.length; i++) {
      const element = this.locations[i];
      if (element.name === location) {
        return element;
      }
    }
  }
}
