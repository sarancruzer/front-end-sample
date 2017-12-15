/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleTypesService } from './vehicle-types.service';

describe('VehiclTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleTypesService]
    });
  });

  it('should ...', inject([VehicleTypesService], (service: VehicleTypesService) => {
    expect(service).toBeTruthy();
  }));
});
