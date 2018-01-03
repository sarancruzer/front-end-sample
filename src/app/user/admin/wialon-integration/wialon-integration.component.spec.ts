/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { Booking } from './../../../models';
import {
  NotificationService,
  BookingsService,
  SessionService,
  VehiclesService,
  VehicleTypesService,
  WialonService,
  LangService,
} from './../../../shared/services';
import { WialonIntegrationComponent } from './wialon-integration.component';

import {
  OrganisationServiceStub,
  SessionServiceStub,
  VehiclesServiceStub,
  WialonServiceStub
} from './../../../../testing';

describe('WialonIntegrationComponent', () => {
  let component: WialonIntegrationComponent;
  let fixture: ComponentFixture<WialonIntegrationComponent>;

  let bookingServiceStub = new OrganisationServiceStub();
  let wialonServiceStub = new WialonServiceStub();
  let sessionServiceStub = new SessionServiceStub();
  let vehiclesServiceStub = new VehiclesServiceStub();

  beforeEach(async(() => {
    spyOn(bookingServiceStub, 'listBookings').and.callFake(() => {
      return {subscribe: () => {}};
    });

    TestBed.configureTestingModule({
      declarations: [ WialonIntegrationComponent ],
      providers: [
        NotificationService,
        {provide: BookingsService, useValue: bookingServiceStub},
        {provide: SessionService, useValue: sessionServiceStub},
        {provide: WialonService, useValue: wialonServiceStub},
        {provide: VehiclesService, useValue: vehiclesServiceStub},
        VehicleTypesService,
        LangService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WialonIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
