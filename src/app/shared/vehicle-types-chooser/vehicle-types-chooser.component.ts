import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MaterialDashboardProService } from './../services';
import { VehicleType } from '../../models';
import { VehicleTypesService } from '../services';

@Component({
  selector: 'nb-vehicle-types-chooser',
  templateUrl: './vehicle-types-chooser.component.html',
  styleUrls: ['./vehicle-types-chooser.component.css']
})
export class VehicleTypesChooserComponent implements OnInit {

  @Output() chosen: EventEmitter<VehicleType[]>;

  vehicleTypes: VehicleType[];

  private choices: VehicleType[] = [];

  constructor(
    private vehicleTypesService: VehicleTypesService,
    private mdpService: MaterialDashboardProService
  ) {
    this.chosen = new EventEmitter<VehicleType[]>();
  }

  ngOnInit() {
    this.vehicleTypes = this.vehicleTypesService.getAll();
    setTimeout(() => this.mdpService.initMdp());
  }

  toggleChoice(type: VehicleType) {
    for (var i = 0; i < this.choices.length; i++) {
      var element = this.choices[i];
      if (element.key === type.key) {
        this.choices.splice(i, 1);

        this.chosen.emit(this.choices);
        return;
      }
    }

    this.choices.push(type);

    this.chosen.emit(this.choices);
  }
}
