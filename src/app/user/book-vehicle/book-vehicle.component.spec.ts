/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, NO_ERRORS_SCHEMA, } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {
  BookingsService,
  VehiclesService,
  SessionService,
  OrganisationService,
  NotificationService,
  LangService,
} from './../../shared/services';
import { BookVehicleWizardService } from './services/book-vehicle-wizard.service';

import { BookVehicleComponent } from './book-vehicle.component';

import { RouterStub } from './../../../testing';

@Component({
  selector: 'nb-filter-vehicle',
  template: ''
})
class FilterVehicleComponentStub { }

@Component({
  selector: 'nb-select-vehicle',
  template: ''
})
class SelectVehicleComponentStub { }

@Component({
  selector: 'nb-confirm-booking',
  template: ''
})
class ConfirmBookingComponentStub { }

describe('BookVehicleComponent', () => {
  let component: BookVehicleComponent;
  let fixture: ComponentFixture<BookVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookVehicleComponent,
        FilterVehicleComponentStub,
        SelectVehicleComponentStub,
        ConfirmBookingComponentStub
      ],
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        BookVehicleWizardService,
        VehiclesService,
        BookingsService,
        OrganisationService,
        NotificationService,
        SessionService,
        { provide: Router, useValue: RouterStub },
        LangService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
