/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { OrganisationComponent } from './organisation.component';
import {
  SessionService,
  OrganisationService,
  NotificationService,
  LangService,
} from '../../../shared/services';
import { User } from '../../../models';
import {
  OrganisationFormComponentStub
} from '../../../../testing';

@Component({
  selector: 'nb-departments',
  template: ''
})
class DepartmentsComponentStub {}

@Component({
  selector: 'nb-locations',
  template: ''
})
class LocationsComponentStub {}

describe('OrganisationComponent', () => {
  let component: OrganisationComponent;
  let fixture: ComponentFixture<OrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganisationComponent,
        OrganisationFormComponentStub,
        DepartmentsComponentStub,
        LocationsComponentStub
      ],
      providers: [{
        provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
        MockBackend,
        BaseRequestOptions,
        SessionService,
        OrganisationService,
        NotificationService,
        LangService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
