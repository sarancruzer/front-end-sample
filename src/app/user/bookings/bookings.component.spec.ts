/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing'

import { BookingsComponent } from './bookings.component';
import { LocationPipe } from '../../shared/pipes';
import {
  SessionService,
  UsersService,
  BookingsService,
  NotificationService,
  LangService,
 } from '../../shared/services';
import { SessionServiceStub } from '../../../testing';

describe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsComponent, LocationPipe],
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        { provide: SessionService, useClass: SessionServiceStub },
        UsersService,
        NotificationService,
        BookingsService,
        LangService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
