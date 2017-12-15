import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';

import {
  LangService,
  StatisticsService,
  NotificationService,
  ChartistService,
} from './../../services';
import { BookingsPerDayComponent } from './bookings-per-day.component';

import { StatisticsServiceStub } from './../../../../testing/nb-stubs';

describe('BookingsPerDayComponent', () => {
  let component: BookingsPerDayComponent;
  let fixture: ComponentFixture<BookingsPerDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsPerDayComponent ],
      providers: [
        LangService,
        NotificationService,
        { provide: StatisticsService, useClass: StatisticsServiceStub },
        ChartistService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
