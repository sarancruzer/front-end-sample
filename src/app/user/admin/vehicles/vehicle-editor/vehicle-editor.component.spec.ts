/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { VehicleEditorComponent } from './vehicle-editor.component';
import {
  SessionService,
  NotificationService,
  VehiclesService,
  LangService,
} from './../../../../shared/services';
import { SessionServiceStub } from './../../../../../testing';

describe('VehicleEditorComponent', () => {
  let component: VehicleEditorComponent;
  let fixture: ComponentFixture<VehicleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleEditorComponent ],
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        VehiclesService,
        {provide: SessionService, useClass: SessionServiceStub },
        NotificationService,
        LangService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleEditorComponent);
    component = fixture.componentInstance;
    component.vehicle =  {
      key: '',
      image: null,
      vehicleId: '',
      trackerId: '',
      type: {
        id: 0,
        key: '',
        name: ''
      },
      manufacturer: '',
      location: '',
      model: '',
      isAvailable: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
