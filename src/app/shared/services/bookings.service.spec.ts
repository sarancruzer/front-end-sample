/* tslint:disable:no-unused-variable */
import { Observable } from 'rxjs/Rx';

import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { BookingsService } from './bookings.service';
import { SessionService } from './session.service';
import { SessionServiceStub } from '../../../testing';

import { Booking } from '../../models';
import JsonToModelTransformers from '../../utils/json.to.model';
import ModelToJsonTransformers from '../../utils/model.to.json';
import Utils from '../../utils/utils';

describe('BookingsService', () => {

  const bookingsFixture = [
    {
      'vehicle': {
        'vehicle_id': 'IF 007',
        'image': '',
        'is_available': true,
        'location': 'Koyambedu',
        'vehicle_key': 'foo',
        'model': 'X',
        'type': 'ELECTRIC'
      },
      'owner': {
        'name': 'Avinash Raj',
        'user_key': 'ahVlfm5leHRib29raW5nLWJhY2tlbmRyKgsSDE9yZ2FuaXNhdGlvbhiAgICA3v6YCgwLEgRVc2VyGICAgICAgMAJDA',
        'phone': '',
        'is_admin': true,
        'department': 'Development',
        'initials': 'AR',
        'email': 'avinash@softence.com',
        'job_title': 'Python Developer'
      },
      'start_time': '12-12-2016 10:15:00',
      'booking_key': 'ahVlfm5leHRib29raW5nLWJhY2tlbmRyLQsSDE9yZ2FuaXNhdGlvbhiAgICA3v6YCgwLEgdCb29raW5nGICAgICAgOAIDA',
      'state': 'ACTIVE',
      'end_time': '15-12-2016 10:15:00'
    },
    {
      'start_time': '30-03-2017 10:04:41',
      'state': 'CANCELLED',
      'booking_key': 'ahVlfm5leHRib29raW5nLWJhY2tlbmRyLQsSDE9yZ2FuaXNhdGlvbhiAgICA3v6YCgwLEgdCb29raW5nGICAgIDQ6pkKDA',
      'end_time': '30-03-2017 11:04:41',
      'vehicle': {
        'vehicle_id': 'AJ 1937',
        'image': '',
        'is_available': true,
        'location': 'Koyambedu',
        'vehicle_key': 'ahVlfm5leHRib29raW5nLWJhY2tlbmRyLQsSDE9yZ2FuaXNhdGlvbhiAgICA3v6YCgwLEgdWZWhpY2xlGICAgIDQjOgKDA',
        'model': 'M2',
        'type': 'TRUCK'
      },
      'owner': {
        'name': '',
        'user_key': 'ahVlfm5leHRib29raW5nLWJhY2tlbmRyKgsSDE9yZ2FuaXNhdGlvbhiAgICA3v6YCgwLEgRVc2VyGICAgICAgMALDA',
        'phone': '',
        'is_admin': true,
        'department': '',
        'initials': '',
        'email': 'ismail@softence.com',
        'job_title': ''
      }
    }
  ];

  beforeEach(() => {
    const sessionServiceStub = new SessionServiceStub();
    spyOn(sessionServiceStub, 'getUser').and.returnValue({ userKey: 'foo' });

    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: SessionService, useValue: sessionServiceStub },
      Http,
      BookingsService,
    ]);
    this.bookingService = this.injector.get(BookingsService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  describe('list()', () => {
    it('should query current service url', () => {
      this.bookingService.list();

      expect(this.lastConnection).toBeDefined('no http service connection at all?');
      expect(this.lastConnection.request.url).toMatch(/\/bookings\/list/);
    });

    it('should return some bookings', fakeAsync(() => {
      let result: Booking[];
      this.bookingService.list().subscribe((bookings: any[]) => result = bookings);
      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({ bookings: bookingsFixture }),
      })));
      tick();

      expect(result.length).toEqual(2, 'should contain given amount of bookings');
      expect(result[0].owner.name).toEqual('Avinash Raj', 'should return the owner name of first booking');
    }));
  });

  describe('draft()', () => {
    it('should create a booking', fakeAsync(() => {
      // stub formatDateUsingUTC function
      spyOn(Utils, 'formatDateUsingUTC').and.callFake(function() {
          return '17-08-2017 15:00:00';
      });

      let bookingResponse: any;
      const booking: Booking = JsonToModelTransformers.jsonToBooking(bookingsFixture[0]);
      this.bookingService.draft(booking).subscribe((response: any) => bookingResponse = response);

      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({ booking_key: 'foobar123' }),
      })));

      expect(bookingResponse.booking_key).toEqual('foobar123');
    }));
  });

  describe('confirm()', () => {
    it('should confirm booking', fakeAsync(() => {
      let response: any;
      const booking: Booking = JsonToModelTransformers.jsonToBooking(bookingsFixture[0]);
      this.bookingService.confirm(booking).subscribe(resp => response = resp);

      this.lastConnection.mockRespond(new Response(new ResponseOptions({
        body: {},
      })));

      expect(this.lastConnection.request.url).toMatch(/\/bookings\/confirm/);
      expect(response.json()).toEqual({});
    }));
  });

});
