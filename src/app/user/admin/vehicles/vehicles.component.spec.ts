/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { VehiclesComponent } from './vehicles.component';
import {
  NotificationService,
  VehiclesService,
  UploadService,
  LangService,
} from './../../../shared/services';
import {
  VehiclesServiceStub,
  UploadServiceStub
} from './../../../../testing/nb-stubs';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesComponent ],
      providers: [
        { provide: VehiclesService, useClass: VehiclesServiceStub },
        { provide: UploadService, useClass: UploadServiceStub },
        NotificationService,
        LangService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
