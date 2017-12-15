import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';

import {
  LangService,
  StatisticsService,
  NotificationService,
  ChartistService,
} from './../../services';
import { BookingsStatusOverviewComponent } from './bookings-status-overview.component';

import { StatisticsServiceStub } from './../../../../testing/nb-stubs';

describe('BookingsStatusOverviewComponent', () => {
  let component: BookingsStatusOverviewComponent;
  let fixture: ComponentFixture<BookingsStatusOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsStatusOverviewComponent ],
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
    fixture = TestBed.createComponent(BookingsStatusOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
