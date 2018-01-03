/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';

import { RegisterComponent } from './register.component';
import {
  NotificationService,
  OrganisationService,
  SessionService
} from '../../shared/services';

import {
  OrganisationFormComponentStub,
  AdminFormComponentStub
} from './../../../testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let organisationService: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [
        AdminFormComponentStub,
        OrganisationFormComponentStub,
        RegisterComponent
      ],
      providers: [{
        provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        MockBackend,
        BaseRequestOptions,
        OrganisationService,
        SessionService,
        NotificationService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    organisationService = fixture.debugElement.injector.get(OrganisationService);
    fixture.detectChanges();
    spyOn(organisationService, 'create');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
