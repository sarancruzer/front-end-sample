/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import {
  VehicleTypesService,
  LocationsService,
  SessionService,
  LangService,
  NotificationService,
} from '../../../shared';
import { FilterVehicleComponent } from './filter-vehicle.component';

import {
  LocationsServiceStub,
  SessionServiceStub
} from './../../../../testing';

describe('FilterVehicleComponent', () => {
  let component: FilterVehicleComponent;
  let fixture: ComponentFixture<FilterVehicleComponent>;
  let sessionServiceStub: SessionServiceStub;
  let locationsServiceStub: LocationsServiceStub;

  beforeEach(async(() => {
    sessionServiceStub = new SessionServiceStub();
    locationsServiceStub = new LocationsServiceStub();

    spyOn(locationsServiceStub, 'list').and.returnValue({subscribe: () => {}});

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MomentModule
      ],
      declarations: [ FilterVehicleComponent ],
      providers: [
        VehicleTypesService,
        { provide: LocationsService, useValue: locationsServiceStub },
        { provide: SessionService, useValue: sessionServiceStub },
        NotificationService,
        LangService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
