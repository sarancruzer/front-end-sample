/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LocationPipe } from './../pipes/location.pipe';
import {
  LocationsService,
  SessionService,
  VehicleTypesService,
  MaterialDashboardProService,
} from '../../../app/shared';
import { VehicleFormComponent } from './vehicle-form.component';
import {
  LocationsServiceStub,
  WindowRefServiceStub
} from './../../../testing';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let locationsServiceStub: LocationsServiceStub;
  let mdp: MaterialDashboardProService;

  beforeEach(async(() => {
    locationsServiceStub = new LocationsServiceStub();
    spyOn(locationsServiceStub, 'list').and.returnValue({subscribe: () => {}});

    const windowRef = new WindowRefServiceStub();
    mdp = new MaterialDashboardProService(windowRef);
    spyOn(mdp, 'initMdp');

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        VehicleFormComponent,
        LocationPipe
      ],
      providers: [
        VehicleTypesService,
        {provide: LocationsService, useValue: locationsServiceStub},
        {provide: MaterialDashboardProService, useValue: mdp}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    component.vehicle = {
      key: 'foo',
      image: null,
      vehicleId: 'AJ 1937',
      trackerId: 'T12345',
      type: {
        id: 6,
        key: 'TRUCK',
        name: 'Truck'
      },
      manufacturer: 'Benz',
      location: 'Koyambedu',
      model: 'M2',
      isAvailable: true
    };
    component.buttonText = 'Create';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
