/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { CalendarComponent } from './calendar.component';
import {
  SessionService,
  UsersService,
  NotificationService,
  LangService,
  WindowRefService,
} from '../../shared/services';
import {
  SessionServiceStub,
  UsersServiceStub,
  WindowRefServiceStub,
} from '../../../testing';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NotificationService,
        { provide: SessionService, useClass: SessionServiceStub },
        { provide: UsersService, useClass: UsersServiceStub },
        { provide: WindowRefService, useClass: WindowRefServiceStub },
        LangService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
