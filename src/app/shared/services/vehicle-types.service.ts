import { Injectable } from '@angular/core';

import { VehicleType } from '../../models';

@Injectable()
export class VehicleTypesService {

  private types: VehicleType[];

  static find(key: String): VehicleType {
    const vehicleTypesService = new VehicleTypesService();
    const types = vehicleTypesService.getAll();
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      if (type.key === key) {
        return type;
      }
    }

    return null;
  }

  constructor() {
    this.types = [
      {id: 1, key: 'ELECTRIC_CAR', name: 'Electric'},
      {id: 2, key: 'MINI_CAR', name: 'Minicar'},
      {id: 3, key: 'SEDAN', name: 'Sedan'},
      {id: 4, key: 'SUV', name: 'SUV'},
      {id: 5, key: 'PICKUP', name: 'Pickup'},
      {id: 6, key: 'TRUCK', name: 'Truck'},
      {id: 7, key: 'MINIBUS', name: 'Minibus'},
      {id: 8, key: 'BUS', name: 'Bus'},
      {id: 9, key: 'VAN', name: 'Van'},
      {id: 10, key: 'OTHER', name: 'Other'}
    ];
  }

  getAll() {
    return this.types;
  }

  getByKey(key: string): VehicleType {
    return VehicleTypesService.find(key);
  }

}
