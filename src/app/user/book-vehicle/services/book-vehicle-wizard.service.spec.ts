/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookVehicleWizardService } from './book-vehicle-wizard.service';

describe('BookVehicleWizardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookVehicleWizardService]
    });
  });

  it('should ...', inject([BookVehicleWizardService], (service: BookVehicleWizardService) => {
    expect(service).toBeTruthy();
  }));
});
