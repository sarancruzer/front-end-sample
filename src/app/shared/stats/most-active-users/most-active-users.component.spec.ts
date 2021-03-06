import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';

import {
  LangService,
  StatisticsService,
  NotificationService,
} from './../../services';
import { MostActiveUsersComponent } from './most-active-users.component';

import { StatisticsServiceStub } from './../../../../testing/nb-stubs';

describe('MostActiveUsersComponent', () => {
  let component: MostActiveUsersComponent;
  let fixture: ComponentFixture<MostActiveUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostActiveUsersComponent ],
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
    fixture = TestBed.createComponent(MostActiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
