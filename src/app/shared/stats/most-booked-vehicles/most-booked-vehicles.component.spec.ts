import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';

import {
  LangService,
  StatisticsService,
  NotificationService,
} from './../../services';
import { MostBookedVehiclesComponent } from './most-booked-vehicles.component';

import { StatisticsServiceStub } from './../../../../testing/nb-stubs';

describe('MostBookedVehiclesComponent', () => {
  let component: MostBookedVehiclesComponent;
  let fixture: ComponentFixture<MostBookedVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostBookedVehiclesComponent ],
      providers: [
        LangService,
        NotificationService,
        { provide: StatisticsService, useClass: StatisticsServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostBookedVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
